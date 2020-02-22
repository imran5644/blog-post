import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, subscribeOn } from 'rxjs/operators'
import { Router } from "@angular/router";



@Injectable({providedIn: 'root'})
export class PostService {
    private posts: Post[] =[];
    private postsUpdated = new Subject<{posts: Post[], postCount: number}>();
   
    constructor(private http: HttpClient, private router: Router){}

    getPosts(postsPerPage: number, currentPage: number){
        const queryParams =`?pageSize=${postsPerPage}&page=${currentPage}`;
        this.http
        .get<{ message: string; posts: any; maxPosts: number }>
        ('http://localhost:3000/api/posts' + queryParams)
        .pipe(
            map(postData => 
       {
         return {
            posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              creator: post.creator
             };
         }), 
         maxPosts: postData.maxPosts
        };
    })
)
        .subscribe(transformedPostsData  => {
             this.posts = transformedPostsData.posts;
             this.postsUpdated.next({
                 posts: [...this.posts],
                 postCount: transformedPostsData.maxPosts
                });
            });
    }
 
    getPostUpdateListener(){
     return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string){
    const post: Post = {
        id: null,
        title: title,
        content: content,
        creator: null
    };
    
    this.http
    .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
    .subscribe(responseData => {
          this.router.navigate(["/"]);
        });
   }

   getPost(id: string){
   return this.http.get<{_id: string, title: string, content: string, post, creator: string }>
   ("http://localhost:3000/api/posts/" + id);
   }

   updatePost(id: string, title: string, content: string ) {
   const post: Post = { id: id, title: title, content: content, creator: null };
   this.http
   .put("http://localhost:3000/api/posts/" + id, post)
   .subscribe(response => {
       this.router.navigate(["/"]);
   });
   }

   deletePost(postId: string){
   return this.http.delete("http://localhost:3000/api/posts/" + postId);
   }

}