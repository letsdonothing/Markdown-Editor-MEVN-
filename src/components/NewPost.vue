<template>
  <div class="posts">
    <h1>Add Document</h1>
    <div class="form">
      <div class="input-width">
        <div class="width-setter">
          <input v-model="title" class="title"></input>
        </div>
      </div>
      <div class="compiler">
        <div class=editor>
          <textarea v-model="input" class="input"></textarea>
        </div>
        <div class="result" v-html="compiledMarkdown"></div>
      </div>
        <button class="add" @click="addPost">Add</button>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import PostsService from '@/services/PostsService'
export default {
  name: 'NewPost',
  data () {
    return {
      input: '# hello',
      title: '',
      dir: ''
    }
  },
  mounted: {
 //   this.input: 
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
  },
  watch: {
    compiledMarkdown: function (oldInput, newInput) {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
    async addPost () {
      var now = Date.now();
      var dir = now + '.md';
      await PostsService.addPost({
        title: this.title,
        dir: dir,
        text: this.input
      })
      this.$router.push({ path: '../posts' })
    },
    async getInput () {
      const response = await PostsService.getInput({
        id: this.$route.params.id
      })
      var dir = response.data.dir
    }
  }
}
</script>
<style type="text/css">
.compiler {
  width: 60%;
  height: 420px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  margin: 20px auto;
}
.editor, .result {
  height: 100%;
}
.title {
  height: 30px;
  width: auto;
  min-width: 20vw;
  background-color: #fff;
}
.input {
  height: 100%;
  width: 100%;
  background-color: #f6f6f6;
}
.title, .input {
  box-sizing: border-box;
  border: 1px solid #ccc;
  resize: none;
  outline: none;
  font-size: 18px;
  font-family: 'Monaco', courier, monospace;
}
.editor {
  width: 50%;
  float: left;
}
.result {
  width: calc(50% - 2px);
  float: left;
}
code {
  color: #f66;
}
.add {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 20vw;
  border: none;
  cursor: pointer;

}
</style>
