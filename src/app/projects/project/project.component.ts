import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { UserService } from 'src/app/service/user.service';

declare const $:any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  disabled = false;
  ShowFilter = false;
  limitSelection = false;

  page : Number = 1;
  pageSize = 5;
  paginationData : string;
  Count : Number;
  pageSizes = [5,10,15];
        
  public value: any = [0];
  selectedItems = [];

  private formSubmitAttempt: boolean;

  creator : any;
  projectsInfo : any;

  public rows = [];
  public srch = [];
  public allProjects:boolean = false;
  public deadline:boolean = false;
  public addP:any = [];
  public updateP:any = [];
  public uptP:any = [];
  public viewP:any = [];

  output: JSON;
  // fb: any;
  // public prgEmpNameList: any[];

  constructor(private router: Router,
    private authService : AppService,
    private projectService:AppService,
    private fb: FormBuilder,
    private userService : UserService) { 
    this.rows = projectService.projects;
    this.srch = [...this.rows];
  }

  ngOnInit() {
    this.creator = sessionStorage.getItem('emp_id')

    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    for(var i=0;i<this.rows.length;i++)
    {
      this.rows[i].description = this.rows[i].description.split(/\s+/).slice(0,25).join(" ");
    }

    this.userService.getProjectList(this.creator,this.page, this.pageSize).subscribe(
      res => { 
        this.projectsInfo = res.Data
        this.Count = res.Count;
        console.log("Project Owners List res with pagination", this.projectsInfo, this.Count);
      },
      err => {
        console.log("API Failure for Project Owners List");
      }
    );

    this.selectedItems = [];

  }

  onUpdate(projectcode){
    this.router.navigate(['projects/edit'], { queryParams: { 'id': projectcode } });
  }

  addProjectPage(){
    this.router.navigate(['projects/projects']);
  }

   //Pagination Steps

   handlePageChange(event): void {
    this.page = event;
    this.userService.getProjectList(this.creator, this.page, this.pageSize).subscribe(
      res => { 
        this.projectsInfo = res.Data
        console.log("Handle Page Change method Invoked! "+ res, this.paginationData);
      },
      err => {
        console.log("Pagination handlePageChange method error");
      }
    )
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    console.log("handle Page size changed! & page size is ", this.pageSize);
    this.userService.getProjectList(this.creator, this.page, this.pageSize).subscribe(
      res => { 
        this.projectsInfo = res.Data
      },
      err => {
        console.log("Pagination handlePageSizeChange method error");
      }
    )
  }

}
