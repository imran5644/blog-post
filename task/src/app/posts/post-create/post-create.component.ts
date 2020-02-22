import { OnDestroy } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { PostService } from './../posts.service';
import { Post } from './../post.model';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
selector: 'app-post-create',
templateUrl: './post-create.component.html',
styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
    enteredTitle = "";
    enteredContent = "";
    post: Post;
    isLoading = false;
    private mode = "create";
    private postId: string;
    private authStatusSub: Subscription;

    
    
    constructor(public postService: PostService, 
                public route: ActivatedRoute,
                private authService: AuthService){}


    ngOnInit(){
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(authStatus => {
        this.isLoading = false;
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('postId')) {
     this.mode = "edit";
     this.postId = paramMap.get('postId');
     this.isLoading = true;
     this.postService.getPost(this.postId).subscribe(postData => {
         this.isLoading = false;
         this.post = { 
             id: postData._id, 
             title: postData.title,
             content: postData.content,
             creator: postData.creator 
            };
     });
    }
    else {
        this.mode = "create";
        this.postId = null;
    }
    });
    }


    onSavePost(form: NgForm){
        
        if(!form.valid){
            return;
        }
        this.isLoading = true;
        if (this.mode === "create"){
            this.postService.addPost(form.value.title,form.value.content);
        }
        else{
            this.postService.updatePost(
            this.postId,
            form.value.title,
            form.value.content
            );
        }
       form.resetForm();
    }



    ngOnDestroy(){
        this.authStatusSub.unsubscribe();
    }
}