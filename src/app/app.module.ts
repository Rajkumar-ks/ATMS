import { OrganizationconfigurationComponent } from './businessconfiguration/organizationconfiguration/organizationconfiguration.component';
import { TimesheetReportComponent } from './timesheet-details/timesheet-report/timesheet-report.component';
import { TimesheetContentComponent } from './timesheet-details/timesheet-content/timesheet-content.component';
import { TimesheetApprovalComponent } from './timesheet-details/timesheet-approval/timesheet-approval.component';
import { TimesheetComponent } from './timesheet-details/timesheet/timesheet.component';
import { ClientPageComponent } from './clients/client-page/client-page.component';
import { RoleComponent } from './role/role/role.component';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule ,DateAdapter, MatSlideToggleModule, MAT_DATE_LOCALE, MatSnackBarModule, MatTooltipModule} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DataTableModule } from "angular2-datatable";
import { NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { MyDatePickerModule } from 'mydatepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FullCalendarModule } from 'ng-fullcalendar';
import { MorrisJsModule } from 'angular-morris-js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeMainComponent } from './employees/employee-main/employee-main.component';
import { AllEmployeesComponent } from './employees/all-employees/all-employees.component';
import { HolidaysComponent } from './employees/holidays/holidays.component';
import { LeavesComponent } from './employees/leaves/leaves.component';
import { AttendanceComponent } from './employees/attendance/attendance.component';
import { DepartmentsComponent } from './employees/departments/departments.component';
import { DesignationsComponent } from './employees/designations/designations.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ClientComponent } from './clients/client/client.component';
import { ProjectComponent } from './projects/project/project.component';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { CallsComponent } from './calls/calls/calls.component';
import { VoicecallComponent } from './calls/voicecall/voicecall.component';
import { VideocallComponent } from './calls/videocall/videocall.component';
import { ChatSidebarComponent } from './calls/chat-sidebar/chat-sidebar.component';
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { LeadsComponent } from './leads/leads/leads.component';
import { AccountsMainComponent } from './accounts/accounts-main/accounts-main.component';
import { EstimatesComponent } from './accounts/estimates/estimates.component';
import { InvoicesComponent } from './accounts/invoices/invoices.component';
import { PaymentsComponent } from './accounts/payments/payments.component';
import { ExpensesComponent } from './accounts/expenses/expenses.component';
import { ProvidentFundComponent } from './accounts/provident-fund/provident-fund.component';
import { TaxesComponent } from './accounts/taxes/taxes.component';
import { EstimateDetailsComponent } from './accounts/estimate-details/estimate-details.component';
import { InvoiceDetailsComponent } from './accounts/invoice-details/invoice-details.component';
import { PaymentsDetailsComponent } from './accounts/payments-details/payments-details.component';
import { EmployeeSalaryComponent } from './payroll/employee-salary/employee-salary.component';
import { PayslipComponent } from './payroll/payslip/payslip.component';
import { PayrollMainComponent } from './payroll/payroll-main/payroll-main.component';
import { EmployeeSalaryEditComponent } from './payroll/employee-salary-edit/employee-salary-edit.component';
import { ProvidentFundDetailsComponent } from './accounts/provident-fund-details/provident-fund-details.component';
import { TaxesDetailsComponent } from './accounts/taxes-details/taxes-details.component';
import { ExpensesDetailsComponent } from './accounts/expenses-details/expenses-details.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { HolidayDetailsComponent } from './employees/holiday-details/holiday-details.component';
import { DepartmentDetailsComponent } from './employees/department-details/department-details.component';
import { DesignationDetailsComponent } from './employees/designation-details/designation-details.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ClientProfileDetailsComponent } from './clients/client-profile-details/client-profile-details.component';
import { ClientProfileEditComponent } from './clients/client-profile-edit/client-profile-edit.component';
import { ProjectProfileDetailsComponent } from './projects/project-profile-details/project-profile-details.component';
import { ProjectProfileEditComponent } from './projects/project-profile-edit/project-profile-edit.component';
import { EmployeeProfileEditComponent } from './employees/employee-profile-edit/employee-profile-edit.component';
import { EmployeeProfileDetailsComponent } from './employees/employee-profile-details/employee-profile-details.component';

import { TimingsheetEditComponent } from './timing-sheet/timingsheet-edit/timingsheet-edit.component';
import { TicketsComponent } from './tickets/tickets/tickets.component';
import { TicketsDetailsComponent } from './tickets/tickets-details/tickets-details.component';
import { TicketsEditComponent } from './tickets/tickets-edit/tickets-edit.component';
import { EstimateEditComponent } from './accounts/estimate-edit/estimate-edit.component';
import { InvoiceEditComponent } from './accounts/invoice-edit/invoice-edit.component';
import { EventsmainComponent } from './eventsmain/eventsmain.component';
import { EventService } from './eventsmain/event.service';
import { ActivitiesComponent } from './activities/activities.component';
import { ChatsComponent } from './chats/chats.component';
import { UsersComponent } from './users/users.component';
import { ReportsmainComponent } from './reports/reportsmain/reportsmain.component';
import { ReportsexpenseComponent } from './reports/reportsexpense/reportsexpense.component';
import { ReportsinvoiceComponent } from './reports/reportsinvoice/reportsinvoice.component';
import { SettingsmainComponent } from './settings/settingsmain/settingsmain.component';
import { SettingscompanyComponent } from './settings/settingscompany/settingscompany.component';
import { SettingslocalizationComponent } from './settings/settingslocalization/settingslocalization.component';
import { SettingsthemeComponent } from './settings/settingstheme/settingstheme.component';
import { SettingsrolesComponent } from './settings/settingsroles/settingsroles.component';
import { SettingsemailsComponent } from './settings/settingsemails/settingsemails.component';
import { SettingsinvoiceComponent } from './settings/settingsinvoice/settingsinvoice.component';
import { SettingsalaryComponent } from './settings/settingsalary/settingsalary.component';
import { SettingsnotificationsComponent } from './settings/settingsnotifications/settingsnotifications.component';
import { SettingspasswordComponent } from './settings/settingspassword/settingspassword.component';
import { SettingsleaveComponent } from './settings/settingsleave/settingsleave.component';
import { AssetsmainComponent } from './assets/assetsmain/assetsmain.component';
import { EmailmainComponent } from './email/emailmain/emailmain.component';
import { ComposeComponent } from './email/compose/compose.component';
import { MessageviewComponent } from './email/messageview/messageview.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ForgetPageComponent } from './pages/forget-page/forget-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { JobsListComponent } from './career/jobs-list/jobs-list.component';
import { JobsDetailsComponent } from './career/jobs-details/jobs-details.component';
import { JobsApplicationComponent } from './career/jobs-application/jobs-application.component';
import { ManagedJobsComponent } from './jobs/managed-jobs/managed-jobs.component';
import { AppliedJobsComponent } from './jobs/applied-jobs/applied-jobs.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { CreatepasswordComponent } from './pages/createpassword/createpassword.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
 import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { FillingtimesheetComponent } from './timing-sheet/fillingtimesheet/fillingtimesheet.component';
import { PendingforapprovalComponent } from './timing-sheet/pendingforapproval/pendingforapproval.component';
import { LoaderinterceptorsService } from './service/loaderinterceptors.service';
import { LoaderServiceService } from './service/loader-service.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { TimingsheetComponent } from './timing-sheet/timingsheet/timingsheet.component';
import {AccordionModule} from "ngx-accordion";
import {MatExpansionModule} from '@angular/material';
import { DateFormat } from './timing-sheet/fillingtimesheet/date-format';
import { HrUserRegistrationComponent } from './employees/hr-user-registration/hr-user-registration.component';
import { EmployeeUserRegisrationComponent } from './employees/employee-user-regisration/employee-user-regisration.component';
import { EmployeeAddListComponent } from './employees/employee-add-list/employee-add-list.component';
import { EmployeeAddListDetailsComponent } from './employees/employee-add-list-details/employee-add-list-details.component';
import { TimesheetweekStatusComponent } from './timing-sheet/timesheetweek-status/timesheetweek-status.component';
import { LeaveDetailsHrComponent } from './employee/leave-details-hr/leave-details-hr.component';

import { HolidaylistComponent } from './employees/holidaylist/holidaylist.component';
import { LeaveDetailsPmComponent } from './employee/leave-details-pm/leave-details-pm.component';
import { LeaveConfigurationHrComponent } from './employee/leave-configuration-hr/leave-configuration-hr.component';
import { CheckDateComponent } from './Date/check-date/check-date.component';
import { AttendanceListComponent } from './employees/attendance-list/attendance-list.component';
import { InputsCheckComponent } from './testing-component/inputs-check/inputs-check.component';
import { BusinessunitComponent } from './businessconfiguration/businessunit/businessunit.component';
import { ResourcetypeComponent } from './businessconfiguration/resourcetype/resourcetype.component';
import { DesignationComponent } from './businessconfiguration/designation/designation.component';
import { RoletypeComponent } from './businessconfiguration/roletype/roletype.component';
import { LevelComponent } from './businessconfiguration/level/level.component';
import { OrganizationroleComponent } from './businessconfiguration/organizationrole/organizationrole.component';
import { ProjecttypeComponent } from './businessconfiguration/projecttype/projecttype.component';
import { ProjectactivitytypeComponent } from './businessconfiguration/projectactivitytype/projectactivitytype.component';
import { TechskillsComponent } from './businessconfiguration/techskills/techskills.component';

enableProdMode();
const routes: Routes = [
  {
    path:'pages/createpassword',
    component: CreatepasswordComponent
  },
  {
    path:'pages/changepassword',
    component: ChangepasswordComponent
  },
  {
    path: '',                       
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],       
    children: [
      {
        path: '',
        component: DashboardComponent   
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent, 
    children: [
      {
        path: 'login',
        component: LoginPageComponent  
      }
    ]
  },
  
  { path: 'dashboard', component: DashboardComponent},
 
  { path: 'employees', component: EmployeeMainComponent, 
    children: [
      { path: '', redirectTo: 'all-employees', pathMatch: 'full' },
      { path: 'all-employees', component: AllEmployeesComponent},
      { path: 'all-employees/edit', component: EmployeeDetailsComponent },
      { path: 'all-employees/employee-edit', component: EmployeeAddListDetailsComponent },
      { path: 'add-employee', component: EmployeeAddListComponent },
      { path: 'holidays', component: HolidaysComponent },
      { path: 'holidaylist', component: HolidaylistComponent },
      
      { path: 'holidays/edit', component: HolidayDetailsComponent },
      { path: 'leaves', component: LeavesComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'departments/edit', component: DepartmentDetailsComponent },
      { path: 'designations', component: DesignationsComponent },
      { path: 'designations/edit', component: DesignationDetailsComponent },

      { path: 'leaves-details-hr', component: LeaveDetailsHrComponent },
      { path: 'leaves-details-pm', component: LeaveDetailsPmComponent },
      { path: 'leave-configuration-hr', component: LeaveConfigurationHrComponent },
    ]
  },
  
  { path: 'input-check-component', component: InputsCheckComponent },
  { path: 'input-check-component', component: InputsCheckComponent },
  { path: 'businessunit', component: BusinessunitComponent },
  { path: 'resourcetype', component: ResourcetypeComponent },
  { path: 'designation', component: DesignationComponent },
  { path: 'roletype', component: RoletypeComponent },
  { path: 'level', component: LevelComponent },
  { path: 'organizationrole', component: OrganizationroleComponent },
  { path: 'projecttype', component: ProjecttypeComponent },
  { path: 'projectactivitytype', component: ProjectactivitytypeComponent },
  { path: 'techskills', component: TechskillsComponent },
  { path: 'attendance-list', component: AttendanceListComponent },
  { path: 'client-page', component: ClientPageComponent },
  
  { path: 'timesheet', component: TimesheetComponent},
  { path: 'timesheet-report', component: TimesheetReportComponent},
  { path: 'timesheet-content', component: TimesheetContentComponent},
  { path: 'timesheet-approval', component: TimesheetApprovalComponent},

  { path: 'clients', component: ClientComponent },
  { path: 'clients/edit', component: ClientDetailsComponent ,  canActivate: [AuthGuard]},
  { path: 'clients/profile/details', component: ClientProfileDetailsComponent ,  canActivate: [AuthGuard]},
  { path: 'clients/profile/edit', component: ClientProfileEditComponent ,  canActivate: [AuthGuard]},
  { path: 'projects', component: ProjectComponent },
  { path: 'projects/edit', component: ProjectProfileEditComponent },
  { path: 'projects/hruserreg', component: HrUserRegistrationComponent },
  { path: 'projects/employeeuserreg', component: EmployeeUserRegisrationComponent },
  { path: 'projects/projects', component: ProjectProfileDetailsComponent },
  
  { path: 'tasks', component: TasksComponent ,  canActivate: [AuthGuard]},
  { path: 'calls', component: CallsComponent , canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'voice-call', pathMatch: 'full'},
    { path: 'voice-call', component: VoicecallComponent},
    { path: 'video-call', component: VideocallComponent}
  ]
  },
  { path: 'contacts', component: ContactsComponent , canActivate: [AuthGuard]},
  { path: 'contacts/edit', component: ContactDetailsComponent , canActivate: [AuthGuard]},
  { path: 'leads', component: LeadsComponent , canActivate: [AuthGuard]},
  { path: 'accounts', component: AccountsMainComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'estimates', pathMatch: 'full' },
    { path: 'estimates', component: EstimatesComponent },
    { path: 'estimates/details', component: EstimateDetailsComponent },
    { path: 'estimates/edit', component: EstimateEditComponent },
    { path: 'invoices', component: InvoicesComponent },
    { path: 'invoices/details', component: InvoiceDetailsComponent },
    { path: 'invoices/edit', component: InvoiceEditComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: 'payments/details', component: PaymentsDetailsComponent },
    { path: 'expenses', component: ExpensesComponent },
    { path: 'expenses/edit', component: ExpensesDetailsComponent },
    { path: 'provident-fund', component: ProvidentFundComponent },
    { path: 'provident-fund/edit', component: ProvidentFundDetailsComponent },
    { path: 'taxes', component: TaxesComponent },
    { path: 'taxes/edit', component: TaxesDetailsComponent }
  ]
  },
  { path: 'payroll', component: PayrollMainComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'employee-salary', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'employee-salary', component: EmployeeSalaryComponent },
    { path: 'employee-salary/edit', component: EmployeeSalaryEditComponent },
    { path: 'payslip', component: PayslipComponent }
  ]
  },
  { path: 'timing-sheet', component: TimingsheetComponent},
  { path: 'timing-sheet/fillingtimesheet', component: FillingtimesheetComponent },
  { path: 'timing-sheet/pendingforapproval', component: PendingforapprovalComponent },
  { path: 'timing-sheet/timesheetweekstatus', component:TimesheetweekStatusComponent },
  { path: 'jobs/managed-jobs', component: ManagedJobsComponent },
  { path: 'jobs/applied-jobs', component: AppliedJobsComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'tickets/edit', component: TicketsEditComponent },
  { path: 'tickets/details', component: TicketsDetailsComponent },
  { path: 'events', component: EventsmainComponent },
  { path: 'chat', component: ChatsComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'inbox', component: EmailmainComponent },
  { path: 'inbox/compose', component: ComposeComponent },
  { path: 'inbox/view', component: MessageviewComponent },
  { path: 'users', component: UsersComponent },
  { path: 'assets', component: AssetsmainComponent },
  { path: 'reports', component: ReportsmainComponent ,children: [
    { path: '', redirectTo: 'expense-reports', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'expense-reports', component: ReportsexpenseComponent },
    { path: 'invoice-reports', component: ReportsinvoiceComponent }
  ]},
  { path: 'settings', component: SettingsmainComponent ,children: [
    { path: '', redirectTo: 'company-settings', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'company-settings', component: SettingscompanyComponent },
    { path: 'localization', component: SettingslocalizationComponent },
    { path: 'theme-settings', component: SettingsthemeComponent },
    { path: 'roles-permissions', component: SettingsrolesComponent },
    { path: 'email-settings', component: SettingsemailsComponent },
    { path: 'invoive-settings', component: SettingsinvoiceComponent },
    { path: 'salary-settings', component: SettingsalaryComponent },
    { path: 'notifications', component: SettingsnotificationsComponent },
    { path: 'change-password', component: SettingspasswordComponent },
    { path: 'leave-type', component: SettingsleaveComponent }
  ]
  },
  { path: 'role', component: RoleComponent },
  { path: 'pages/login', component: LoginPageComponent },
  { path: 'pages/register', component: RegisterPageComponent },
  { path: 'pages/forgot-password', component: ForgetPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'profile/edit', component: ProfileEditComponent },
  { path: 'career/jobs', component: JobsListComponent },
  { path: 'career/job-details', component: JobsDetailsComponent },
  { path: 'career/job-application', component: JobsApplicationComponent },
  { path: 'check-date', component: CheckDateComponent },
  { path: '**', redirectTo: 'pages/login' },
  
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeMainComponent,
    AllEmployeesComponent,
    HolidaysComponent,
    LeavesComponent,
    AttendanceComponent,
    DepartmentsComponent,
    DesignationsComponent,
    SidebarComponent,
    HeaderComponent,
    ClientComponent,
    ProjectComponent,
    TasksComponent,
    CallsComponent,
    VoicecallComponent,
    VideocallComponent,
    ChatSidebarComponent,
    ContactsComponent,
    LeadsComponent,
    AccountsMainComponent,
    EstimatesComponent,
    InvoicesComponent,
    PaymentsComponent,
    ExpensesComponent,
    ProvidentFundComponent,
    TaxesComponent,
    EstimateDetailsComponent,
    InvoiceDetailsComponent,
    PaymentsDetailsComponent,
    EmployeeSalaryComponent,
    PayslipComponent,
    PayrollMainComponent,
    EmployeeSalaryEditComponent,
    ProvidentFundDetailsComponent,
    TaxesDetailsComponent,
    ExpensesDetailsComponent,
    ClientDetailsComponent,
    ContactDetailsComponent,
    EmployeeDetailsComponent,
    HolidayDetailsComponent,
    DepartmentDetailsComponent,
    DesignationDetailsComponent,
    ProjectDetailsComponent,
    ClientProfileDetailsComponent,
    ClientProfileEditComponent,
    ProjectProfileDetailsComponent,
    ProjectProfileEditComponent,
    EmployeeProfileEditComponent,
    EmployeeProfileDetailsComponent,
    TimingsheetComponent,
    TimingsheetEditComponent,
    TicketsComponent,
    TicketsDetailsComponent,
    TicketsEditComponent,
    EstimateEditComponent,
    InvoiceEditComponent,
    EventsmainComponent,
    ActivitiesComponent,
    ChatsComponent,
    UsersComponent,
    ReportsmainComponent,
    ReportsexpenseComponent,
    ReportsinvoiceComponent,
    SettingsmainComponent,
    SettingscompanyComponent,
    SettingslocalizationComponent,
    SettingsthemeComponent,
    SettingsrolesComponent,
    SettingsemailsComponent,
    SettingsinvoiceComponent,
    SettingsalaryComponent,
    SettingsnotificationsComponent,
    SettingspasswordComponent,
    SettingsleaveComponent,
    AssetsmainComponent,
    EmailmainComponent,
    ComposeComponent,
    MessageviewComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForgetPageComponent,
    ProfilePageComponent,
    JobsListComponent,
    JobsDetailsComponent,
    JobsApplicationComponent,
    ManagedJobsComponent,
    AppliedJobsComponent,
    ProfileEditComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    CreatepasswordComponent,
    ChangepasswordComponent,
    LoadingSpinnerComponent,
    FillingtimesheetComponent,
    PendingforapprovalComponent,
    HrUserRegistrationComponent,
    EmployeeUserRegisrationComponent,
    EmployeeAddListComponent,
    EmployeeAddListDetailsComponent,
    TimesheetweekStatusComponent,
    LeaveDetailsHrComponent,
    LeaveDetailsPmComponent,
    LeaveConfigurationHrComponent,
    RoleComponent,
    HolidaylistComponent,
    CheckDateComponent,
    AttendanceListComponent,
    InputsCheckComponent,
    ClientPageComponent,
    BusinessunitComponent,
    ResourcetypeComponent,
    DesignationComponent,
    RoletypeComponent,
    OrganizationroleComponent,
    LevelComponent,
    ProjecttypeComponent,
    ProjectactivitytypeComponent,
    TechskillsComponent,
    TimesheetComponent,
    TimesheetApprovalComponent,
    TimesheetContentComponent,
    TimesheetReportComponent,
    OrganizationconfigurationComponent
    ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    DataTableModule,
    NgSlimScrollModule,
    MyDatePickerModule,
    NgxDatatableModule,
    FullCalendarModule,
    MorrisJsModule,
    HttpClientModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    NgxPaginationModule,
    MatNativeDateModule,
    MatInputModule,
    MyDatePickerModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    AutocompleteLibModule,
    AngularMultiSelectModule,
    AccordionModule,
    MatExpansionModule,
    NgMultiSelectDropDownModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forRoot(routes),
    MatSlideToggleModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [
    EventService,
    LoaderServiceService,
    {
      provide: SLIMSCROLL_DEFAULTS,
      useValue: {
        alwaysVisible : false
      }
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderinterceptorsService, multi: true },
    { provide: DateAdapter, useClass: DateFormat },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
