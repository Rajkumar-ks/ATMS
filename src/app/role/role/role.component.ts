import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(
    private userService: UserService,
    public fb: FormBuilder) { }

    roleNameList = [];
    saveFetureIdList = [];
    roleDetails : any;
    //categories : any;
    actVar = "";
    html = "";

    selectedFeatureId = [];


  ngOnInit() {

    this.loadAction();

  }

  loadAction()
  {
    this.loadRolesName();
    this.onChangeRoleAction();
    this.test();
  }

  public loadRolesName() {
   
    $('#role_type1').find('option').remove();
  
    this.userService.getRoleNames().subscribe(
      res => {
        console.log("API Success for role names", res);
        let resourceUnit = res.roles

        let resourceUnit_Array = resourceUnit.split(',')

        var select = document.getElementById("role_type1");

        var option = document.createElement("option");

        for (var i = 0; i < resourceUnit_Array.length; i++) {

          var textVal = resourceUnit_Array[i].split('_')[1];
          var val = resourceUnit_Array[i].split('_')[0];

          var option = document.createElement("option");
          option.textContent = textVal;
          option.value = val;
          select.appendChild(option);
        }

      },
      err => {
        console.log("API Failure for role names");
      }
    );


  }


  createRole()
  {
     var role_type = document.getElementById("role_types");
     var create_role = document.getElementById("create_role");

     if (role_type.style.display === "none") {
       // secound click
       role_type.style.display = "block";
       create_role.style.display = "none";
       $('#add_role_id').val("");

       $('#add_role_btn').removeClass('fa fa-backward');
       $('#add_role_btn').addClass('fa fa-user-plus');

       document.getElementById('add_role_btn').title = 'Add Role';
       document.getElementById("update_btn_id").innerHTML = "Update";
       this.actVar = "UPDATE";
       this.onChangeRoleAction();

     }
     else {   // first click
       role_type.style.display = "none";
       create_role.style.display = "block";
       //$('#add_role_id').val("Create");
       $('input:checkbox').removeAttr('checked');

       $('#add_role_btn').removeClass('fa fa-user-plus');
       $('#add_role_btn').addClass('fa fa-backward');
       document.getElementById('add_role_btn').title = 'Back';
       document.getElementById("update_btn_id").innerHTML = "Save";
       this.actVar = "SAVE";
       this.findAllFeature();
     }

  }

  public findAllFeature()
  {
    $("#checkboxes").empty();
    this.html="";

   this.userService.findAllFeatures().subscribe(
   res => {
    
     var json1 = JSON.stringify(res)
     var json=JSON.parse(json1);
   
     this.parseIssues(json.selectedissues);
     document.getElementById("checkboxes").innerHTML = this.html;
   },
   err => {
     console.log("API Failure for get main getRoleModuleNames names" + err);
   }
    );
  }

  onChangeRoleAction() {

    let tempRoleName = $("#role_type1").val();
    let roleName="";

    if(tempRoleName == null)
           roleName="1";
    else
         roleName = $("#role_type1").val();
         
     $("#checkboxes").empty();
     this.html="";

    this.userService.getRoleFeature(roleName).subscribe(
    res => {
     
      var json1 = JSON.stringify(res)
      var json=JSON.parse(json1);
    
      this.parseIssues(json.selectedissues,);
      document.getElementById("checkboxes").innerHTML = this.html;
    },
    err => {
      console.log("API Failure for get main getRoleModuleNames names" + err);
    }
  );

       
}


public createCheck(issue) {

  if(issue.ischecked == "checked")
    return "<input name='chk' type='checkbox' id='" + issue.feature_id + "' value='" + issue.feature_id + "' checked/><label style='margin:0 0 0 6px' for='" + issue.feature_id + "'>" + this.capitalizeFirstLetter(issue.feature_name) + "</label>";
  else
     return "<input name='chk' type='checkbox' id='" + issue.feature_id + "' value='" + issue.feature_id + "' /><label style='margin:0 0 0 6px' for='" + issue.feature_id + "'>" + this.capitalizeFirstLetter(issue.feature_name) + "</label>";

  }

public parseIssues(issues) {
    this.html += "<ul class=treeview>";

    for (var i = 0; i < issues.length; i++) { 

        var issue = issues[i],
            input = this.createCheck(issue); // Creates the html for the checkbox
            this.html += "<li>" + input;
        if (issue.children.length > 0) {
            this.parseIssues(issue.children); // Calls a function which does similar to this for with the children.
        }
        this.html += "</li>";
    }
    this.html += "</ul>";
}

saveRole()
{
  let saveModuleNameList=[];
  let role_name="";

  $("input[name='chk']:checked").each(function (index, obj) {
  saveModuleNameList.push($(this).val() );
  });

  if(this.actVar == "SAVE")
  role_name = $("#add_role_id").val();
  else
  role_name = $("#role_type1").val();

  if(role_name == "")
  {
  alert("Please eneter the role name !!")
  return;
  }

  if(saveModuleNameList.length == 0)
  {
  alert("Please select the modules !!")
  return;
  }

  this.roleDetails = {
  "creator_by" : "AS10001",
  "role_name" : role_name,
  "Features_id" : saveModuleNameList.toString()
  }

  if(this.actVar == "SAVE")
  {
  this.userService.addRole(this.roleDetails).subscribe(
    res => {
    console.log('succes');
    swal.fire({title: "Role Created Successfully !!!", showConfirmButton: true});
    },
    err => {
    console.log('error');
    swal.fire({title: "Role Creation Failed !!!", showConfirmButton: true});
    }
  )

  }
  else{
  this.userService.deleteRolefeature(role_name).subscribe(
    res => {
    console.log('deleteRolefeature succes '+res);
    this.userService.UpdateRolefeature(this.roleDetails).subscribe(
      res => {
        console.log('UpdateRolefeature succes' +res);
        swal.fire({title: "Role Updated Successfully !!!", showConfirmButton: true});
      },
      err => {
        console.log(' UpdateRolefeatureerror' +JSON.stringify(err));
        swal.fire({title: "Role Updation Failed !!!", showConfirmButton: true});
      }
    )

    },
    err => {
    console.log('error' + JSON.stringify(err));
    }
  )
  }
}

  remove_role(){
    swal.fire({title: "Do You Want to Delete ?", showConfirmButton: true,showCancelButton: true}).then(result => {
    if (result.value) {
    
      let roleid = $("#role_type1").val();
      this.userService.deleteRole(roleid).subscribe(
        res => {
        swal.fire({title: "Delete Role Successfully !!!", showConfirmButton: true});
          this.ngOnInit();
        },
        err => {
        console.log("API Failure for romove role "+ err);
        swal.fire({title: "Role Deletion Failed !!!", showConfirmButton: true});
        
        }
      );  
    } 
    else {
      
      }
    })
  
  }
  test() {}

  public capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}

  