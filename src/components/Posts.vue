<template>
  <div class="posts">
    <h1>Posts</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPost' }" class="">Add Post</router-link>
      </div>
      <table>
        <tr v-for="post in posts">
          <td align="center">
            <router-link v-bind:to="{ name: 'NewPost', params: { id: post._id } }"> {{ post.title }} </router-link>
          </td>
          <td id="dir"> {{ post.dir }} </td>
          <td id="delete"><a href="#" @click="deletePost(post._id)">Delete</a></td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Add Post</router-link>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data.posts
    },
    async deletePost (id) {
      await PostsService.deletePost(id)
      await this.getPosts()
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  text-align: center;
  margin: 0 auto;
}
table {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
#dir {
  width: 50%;
}
#delete {
  width: 100px;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
