<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-btn color="primary" @click="gotoCurrentWeek" depressed class="mr-3 text-capitalize"> Go to Current Week</v-btn>
        </v-col>
         <v-col>
          <v-btn color="primary"  @click="perWeek" depressed class="mr-3" fab><v-icon> mdi-chevron-left </v-icon></v-btn>
        </v-col>
        <v-col>
          <v-text-field v-model="navigationWeek" @change="navWeek" :rules="[v => v <= 52 || 'To remember that a year has only 52 weeks']" label="Weeks"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="navigationYear" @change="navYear" label="Year"></v-text-field>
        </v-col>
        <v-col>
          <v-btn color="primary" @click="nextWeek" depressed fab> <v-icon> mdi-chevron-right </v-icon></v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="2"
        >
          <v-card>
            <v-card-title>Task</v-card-title>
              <v-list-item v-for="(task,index) in taskDetail" :key="index" draggable @dragstart="toSetTask(task)"  @dragend="addUserDetail()">
                {{ task.task }}
              </v-list-item>
          </v-card>
          
        </v-col>
        <v-col
          cols="12"
          md="10"
        >
        <v-simple-table class="my-2">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  User 
                </th>
                <th class="text-left" v-for="item in weekDays" :key="item"> {{ item }} </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">Name</td>
                <td class="text-left" v-for="item in weekDates" :key="item">{{ item }}</td>
              </tr>
              <tr v-for=" (userdetail,index) in userDetails" :key="index">
                <td class="text-left"> <div>{{ userdetail.user }}</div></td>
                <td class="text-left" v-for="(date,index) in weekDates" :key="index" @dragover.prevent="toSetDateAndUser(userdetail,date)">{{ toCheckDate(userdetail,date) }}</td>
              </tr>
            </tbody>
          </template>
          </v-simple-table>
        </v-col>
     </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      selectedTask:'',
      day:1,
      weekDays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      weekDates:[],
      userDetails:[],
      taskDetail:[{task:'test1'},{task:'test2'},{task:'test3'}],
      selectedDate:'',
      selectedUser:'',
      presentWeek: '',
      presentYear: '',
      goToCurWeek: '',
      navigationWeek:'',
      navigationYear: '',
      goToCurYear: ''
    }
  },
  methods:{
    toSetDateAndUser(userdetail,date){
      this.selectedDate=date;
      this.selectedUser=userdetail;
    },
    toSetTask(value){
      this.selectedTask = value.task
    },
    addUserDetail(){
      this.userDetails.forEach((val,index) => {
        if(val.user == this.selectedUser.user){
          this.userDetails[index].task.push({date:this.selectedDate,name:this.selectedTask})
          localStorage.setItem('user',JSON.stringify(this.userDetails))
        }
      })
      this.selectedDate = ''
      this.selectedTask = ''
    },
    toCheckDate(userdetail,date){
      let result = ''
      userdetail.task.forEach(val => {
        val.date == date ?  (result += " " + val.name) : ('')
      })
      return result
    },
    nextWeek(){
      this.weekDates=[]
      this.presentWeek++
      if(this.presentWeek > 52){
        this.navigationWeek = 1
        this.presentWeek = 1
        this.presentYear++
        this.navigationYear = this.presentYear
      }else{
        this.navigationWeek = this.presentWeek
      }
      this.curWeekDates()
    },
    perWeek(){
      this.weekDates=[]
      this.presentWeek--
      if(this.presentWeek < 1){
        this.navigationWeek = 52
        this.presentWeek = 52
        this.presentYear--
        this.navigationYear = this.presentYear
      }else{
        this.navigationWeek = this.presentWeek
      }
      this.curWeekDates()
    },
    gotoCurrentWeek(){
      this.weekDates=[]
      this.presentWeek = this.goToCurWeek
      this.navigationWeek = this.goToCurWeek
      this.navigationYear = this.goToCurYear
      this.presentYear = this.goToCurYear
      this.curWeekDates()
    },
    curWeekDates(){
      for (let i = 1; i <= 7; i++) {
        let date = new Date(this.presentYear, 0, (1 + (this.presentWeek - 1) * 7));
        date.setDate(date.getDate() + (i - date.getDay()));
        this.weekDates.push(date.toISOString().slice(0, 10))
      }
    },
    navWeek(){
      this.weekDates=[]
      this.presentWeek = this.navigationWeek
      this.curWeekDates()
    },
    navYear(){
      this.weekDates=[]
      this.presentYear = this.navigationYear
      this.curWeekDates()
    },
    curWeekAndYear(){
      let currentDate = new Date 
      let currentYear =  new Date(currentDate.getFullYear(), 0);
      let numberOfDays =  Math.round((currentDate - currentYear) / (24 * 60 * 60 * 1000));
      let numberOfWeek = Math.round(1 + numberOfDays / 7)
      this.presentWeek = numberOfWeek 
      this.goToCurWeek = numberOfWeek
      this.navigationWeek = numberOfWeek
      this.presentYear = currentDate.getFullYear()
      this.navigationYear = this.presentYear
      this.goToCurYear = this.presentYear
    },
    toGetUserAndTask(){
      if(localStorage.getItem('user')){
        let userDetail = localStorage.getItem('user')
        let users = JSON.parse(userDetail)
        users.forEach(val => {
        this.userDetails.push(val)
        })
      }
      if(localStorage.getItem('task')){
        let taskDetail = localStorage.getItem('task')
        let tasks = JSON.parse(taskDetail)
        tasks.forEach(val => {
        this.taskDetail.push(val)
        })
      }
    }
  },
  created(){
    this.curWeekAndYear()
    this.curWeekDates()
    this.toGetUserAndTask()
  },
}
</script>

<style>
   td, tbody {
    border: 1px solid grey;
  }
</style>