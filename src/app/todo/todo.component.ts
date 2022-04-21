import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { iTask } from '../Model/itask';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
tasks :iTask[]=[];
inProgress :iTask[]=[];
done:iTask[]=[];
myModel:any;
public datenow=new Date();
public isEdit=true;
nameadd="add task";
nameedit="Edit";
my_object:any;

  constructor(private fb:FormBuilder) { }
todoForm!:FormGroup
  ngOnInit(): void {
    this.todoForm=this.fb.group({
      item:['',Validators.required]
    })
    if(JSON.parse(localStorage.getItem('tasks')+"").length>0){
    // this.tasks = JSON.parse(localStorage.getItem('tasks')+"");

    }
  //  this.tasks = JSON.parse(localStorage.getItem('testObject')+"");
  //  this.inProgress = JSON.parse(localStorage.getItem('inprogress')+"");
  // localStorage.removeItem('inprogress');


  }

  drop(event: CdkDragDrop<any[]>){
// localStorage.setItem('tasks', JSON.stringify(this.tasks));

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

  }
  addtoListProgress(data:any){
    let dat=new Date();

    this.inProgress.push({
      description:data,
    date:dat,
    done:false
    })
    console.log(this.inProgress);

  }

  addtolist(data:any){
      let dat=new Date();
    this.tasks.push({
    description:data,
    date:dat,
    done:false
});
// localStorage.setItem('tasks', JSON.stringify(this.tasks));
this.reset();


  }
  deleteTask(data:number){
   this.tasks.splice(data,1);
localStorage.removeItem('tasks');

  }
  deleteTaskInProgress(i:number){
    this.inProgress.splice(i,1)

  }
  deleteTaskIndone(i:number){
    this.done.splice(i,1)

  }
  public item!:number;
  onEdit(i:number){
    this.isEdit=false;
  this.myModel=this.tasks[i].description;
this.item=i;
  }
  edit(){
     this.tasks[this.item].description=this.myModel;
    this.isEdit=true;
    this.reset();

  }
  reset(){
    this.myModel="";



  }

}
