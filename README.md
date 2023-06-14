# connections-mern-code
Social media MERN Stack Application Code

## Server (Node JS, Express Js, MongoDB, Mongoose, Bcrypt, JWT)
## Client (React JS, Context API)

### Routes
1. Auth Routes
   1. Register - Creates a new user
   2. Login - Sign in the existing user 
3. User Routes
   1. Update - Edit the details of an existing user
   2. Get - Provides the user info
   3. Follow / Unfollow - Follow or Unfollow an existing user (except self)
   4. Search - Search for existing users using the initials of their first name, last name or username
5. Post Routes
   1. Create - Creates a new post for a logged in user
   2. Update post - Only the creator of the post can edit the post
   3. Delete post - Only the creator of the post can delete the post
   4. Get post - Get a post is a user is logged in
   5. Get Timeline Posts - Get all the posts of the users followed and the current user's own posts
   6. Get Profile posts - Get all the posts of a profile of a user
   7. Like / Unlike post - Logged in user can like or unlike a post
