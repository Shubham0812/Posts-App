
# Posts-App
An application created with Angular where users can write and see posts.


## Technologies Used
- HTML5
- SCSS 
- Angular
- Typescript
- Node.js
- MongoDB

## Features

- Simple and clean UI design.
- Realtime update of posts.

## Code Example

    updatePost(postId: string, postTitle: string, postContent: string) {
	    const postData: IPost = {
		    id: postId,
		    title: postTitle,
		    content: postContent
	    };
    
	    this.http
	    .put(`${this.servicesUrl}api/posts/${postId}`, postData)
	    .subscribe(res => {    
	    const oldIndex =  this.posts.findIndex(post => post.id === postId);
	    this.posts[oldIndex] = postData;
	    // console.log("After updating posts", this.posts);
	    this.changeInPost(true);
	    });
    }
    
  Updates the existing post


## How to use ?

#### Prerequisites

  - An active internet connection.
  - Node & Npm.
  - Modern Browser such as Edge, Chrome, Safari, Firefox.
  - Visual Studio Code.

 #### Usage 

1. Download or clone the repository.
2. cd into the directory.
3. Install the required dependencies using `npm-install` 
4. To start the server locally use `npm run start:server` ( make sure this is always running in a terminal or cmd)
5. To start the project  use `npm run start`.


## Credits

**©** **Shubham Kumar Singh** | *2019*

