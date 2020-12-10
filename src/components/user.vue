<template>
  <div>
    <v-dialog
      v-model="userDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Add User Name
        </v-card-title>
          <v-text-field
            v-model="user"
            label="Enter User Name"
          ></v-text-field>
        <v-card-text>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="addUser"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="taskDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Add Task 
        </v-card-title>
          <v-text-field
            v-model="task"
            label="Enter your task"
          ></v-text-field>
        <v-card-text>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="addTask"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-btn 
            depressed
            color="primary"
            @click="userDialog = true"
            class="mr-6"
          >
          Add User
          </v-btn>
          <v-btn 
            color="primary"
            depressed
            @click="taskDialog = true"
          >
          Add Task
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      user:'',
      task: '',
      userArr:[],
      taskArr:[],
      userDialog: false,
      taskDialog: false
    }
  },
  methods:{
    addUser(){
      this.userDialog = false
      if(this.user){
      if(localStorage.getItem('user')){
        let userDetail = localStorage.getItem('user')
        let users = JSON.parse(userDetail)
        users.forEach(val => {
          this.userArr.push(val)
        })
        this.userArr.push({user:this.user,task:[{name:'',date:''}]})
        localStorage.setItem('user',JSON.stringify(this.userArr))
      }else{
        this.userArr.push({user:this.user,task:[{name:'',date:''}]})
        localStorage.setItem('user',JSON.stringify(this.userArr))
      }
      this.user = ''
      }
    },
    addTask(){
      this.taskDialog = false
      if(this.task){
      if(localStorage.getItem('task')){
        let taskDetail = localStorage.getItem('task')
        let tasks = JSON.parse(taskDetail)
        tasks.forEach(val => {
          this.taskArr.push(val)
        })
        this.taskArr.push({task:this.task})
        localStorage.setItem('task',JSON.stringify(this.taskArr))
      }else{
        this.taskArr.push({task:this.task})
        localStorage.setItem('task',JSON.stringify(this.taskArr))
      }
      this.task = ''
      }
    },
  }
}
</script>

<style>

</style>