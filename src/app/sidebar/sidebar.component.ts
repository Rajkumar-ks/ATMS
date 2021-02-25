import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router'
import { ISlimScrollOptions } from 'ngx-slimscroll';
import { AppService } from '../app.service';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  opts: ISlimScrollOptions;
  public url;
  url2;
  homeView :boolean = true;
  chatView :boolean = false;
  mailView :boolean = false;
  messageView :boolean = false;
  composeView :boolean = false;
  settingsView :boolean = false;
  callView :boolean = false;
  taskView :boolean = false;
  accessfeature:any;
  dashboardview :boolean = true;
  projects :boolean = true;
  timesheetview :boolean = true;
  leaveDetailsView :boolean = true;
  leaveApplyView :boolean = true;

  leaveReportsView :boolean = true;
  leaveApprovalView :boolean = true;
  leaveConfigurationView :boolean = true;
  addHolidaysView :boolean = true;
  HolidaysView :boolean = true;

  employee :boolean = true;
  addemployee :boolean = true;
  employeeProfile :boolean = true;
  roles :boolean = true;
  
  projectview :boolean = false;
  addTimesheetview :boolean = false;
  TimesheetReportview :boolean = false;
  TimesheetApprovedview:boolean = false;

  constructor(private location:Location,
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private renderer:Renderer2,
              private authService: AppService,) {

                this.router.events.subscribe((event: Event) => {
                  //console.log(event);
                 
                  if (event instanceof NavigationStart) {
                    $(".modal").modal("hide");
                    //console.log(event.url);
                  }
            
                  if (event instanceof NavigationEnd) {
                    //console.log(event.url);
                    this.url = event.url.split('/')[1];
                    this.url2 = event.url.split('/')[2];
            
                    let height = $(window).height();	
                    $(".page-wrapper").css("min-height", height);
            
                    $(".main-wrapper").removeClass('slide-nav-toggle');
                    $('#chat_sidebar').removeClass('opened');
                    $('.sidebar-overlay').removeClass('opened');
                    $('.task-overlay').removeClass('opened');
            
                    if(this.url == 'settings')
                    {
                      this.homeView  = false;
                      this.chatView  = false;
                      this.mailView  = false;
                      this.settingsView = true;
                      this.messageView = false;
                      this.composeView = false;
                      this.callView = false;
                      this.taskView = false;
                    }
                    else if(this.url == 'chat')
                    {
                      this.homeView  = false;
                      this.chatView  = true;
                      this.mailView  = false;
                      this.settingsView = false
                      this.messageView = false;
                      this.composeView = false;
                      this.callView = false;
                      this.taskView = false;
                    }
                    else if(this.url == 'calls')
                    {
                      this.homeView  = false;
                      this.chatView  = false;
                      this.mailView  = false;
                      this.settingsView = false
                      this.messageView = false;
                      this.composeView = false;
                      this.callView = true;
                      this.taskView = false;
                    }
                    else if(this.url == 'tasks')
                    {
                      this.homeView  = false;
                      this.chatView  = false;
                      this.mailView  = false;
                      this.settingsView = false
                      this.messageView = false;
                      this.composeView = false;
                      this.callView = false;
                      this.taskView = true;
                    }
                    else if(this.url == 'inbox')
                    {
                      this.homeView  = false;
                      this.chatView  = false;
                      this.mailView  = true;
                      this.settingsView = false;
                      this.messageView = false;
                      this.composeView = false;
                      this.callView = false;
                      this.taskView = false;
                          if(this.url2 == 'compose')
                          {
                            this.homeView  = false;
                            this.chatView  = false;
                            this.mailView  = false;
                            this.settingsView = false;
                            this.messageView = false;
                            this.composeView = true;
                            this.callView = false;
                            this.taskView = false;
                          }
                          else if(this.url2 == 'view')
                          {
                            this.homeView  = false;
                            this.chatView  = false;
                            this.mailView  = false;
                            this.settingsView = false;
                            this.messageView = true;
                            this.composeView = false;
                            this.callView = false;
                            this.taskView = false;
                          }
                    }
                    else
                    {
                      this.homeView  = true;
                      this.chatView  = false;
                      this.mailView  = false;
                      this.settingsView = false;
                      this.messageView = false;
                      this.composeView = false;
                      this.callView = false;
                      this.taskView = false;
                    }
            
                  this.accessfeature=JSON.parse(sessionStorage.getItem("accessfeatures"));

                  console.log(this.accessfeature);
                  if(this.accessfeature){

                    if(this.accessfeature.includes("dashboard")){
                      this.dashboardview = true;
                    }else{
                      this.dashboardview = false;
                    }

                    if(this.accessfeature.includes("employee")){
                      this.employee=true;
                    }else{
                      this.employee=false;
                    }

                    if(this.accessfeature.includes("addemployee")){
                      this.addemployee=true;
                    }else{
                      this.addemployee=false;
                    }

                    if(this.accessfeature.includes("employeeprofile")){
                      this.employeeProfile=true;
                    }else{
                      this.employeeProfile=false;
                    }

                    if(this.accessfeature.includes("roles")){
                      this.roles=true;
                    }else{
                      this.roles=false;
                    }

                    if(this.accessfeature.includes("projects")){
                      this.projects=true;
                    }else{
                      this.projects=false;
                    }

                    // if(this.accessfeature.includes("addproject")){
                    //   this.projectview=true;
                    // }else{
                    //   this.projectview=false;
                    // }

                    // if(this.accessfeature.includes("timesheet")){
                    //   this.timesheetview=true;
                    // }else{
                    //   this.timesheetview=false;
                    // }

                    if(this.accessfeature.includes("timesheetapply")){
                      this.addTimesheetview=true;
                    }else{
                      this.addTimesheetview=false;
                    }
                    
                    if(this.accessfeature.includes("timesheetreport")){
                      this.TimesheetReportview=true;
                    }else{
                      this.TimesheetReportview=false;
                    }
                    
                    if(this.accessfeature.includes("timesheetapproval")){
                      this.TimesheetApprovedview=true;
                    }else{
                      this.TimesheetApprovedview=false;
                    }

                    if(this.accessfeature.includes("leavedetails")){
                      this.leaveDetailsView=true;
                    }else{
                      this.leaveDetailsView=false;
                    }

                    if(this.accessfeature.includes("leaveapply")){
                      this.leaveApplyView=true;
                    }else{
                      this.leaveApplyView=false;
                    }

                    if(this.accessfeature.includes("leavereports")){
                      this.leaveReportsView=true;
                    }else{
                      this.leaveReportsView=false;
                    }

                    if(this.accessfeature.includes("leaveapproval")){
                      this.leaveApprovalView=true;
                    }else{
                      this.leaveApprovalView=false;
                    }
                    if(this.accessfeature.includes("leaveconfiguration")){
                      this.leaveConfigurationView=true;
                    }else{
                      this.leaveConfigurationView=false;
                    }
                    if(this.accessfeature.includes("addholidays")){
                      this.addHolidaysView=true;
                    }else{
                      this.addHolidaysView=false;
                    }
                    if(this.accessfeature.includes("holidays")){
                      this.HolidaysView=true;
                    }else{
                      this.HolidaysView=false;
                    }
                  } 
                }
            
                  if (event instanceof NavigationError) {
                    //console.log(event.error);
                  }
                });
  

  }

  ngOnInit() {   
    
    
    this.opts = {
      barBackground: '#ccc',
      gridBackground: 'transparent',
      barOpacity: '0.4',
      barBorderRadius: '6',
      barWidth: '6',
      gridWidth: '0',
      alwaysVisible: false,
      //height:'100%'
    }

    var h=$(window).height()-60;
    $('.slimscroll-wrapper').height(h); 
    
    $(window).resize(function(){
    var h=$(window).height()-60; 
    $('.slimscroll-wrapper').height(h);
    }); 
  }


}

