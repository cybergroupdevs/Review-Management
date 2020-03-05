import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';


@Component({
  selector: 'app-self-review',
  templateUrl: './self-review.component.html',
  styleUrls: ['./self-review.component.scss']
})
export class SelfReviewComponent implements OnInit {
  message: any;
  res:any;
  @ViewChild('rsTS', {static: false}) rsTS: ElementRef;
  @ViewChild('rsCS', {static: false}) rsCS: ElementRef;
  @ViewChild('rsP', {static: false}) rsP: ElementRef;
  // @ViewChild('assessmentSelfP', {static: false}) assessmentSelfP: ElementRef;
  // @ViewChild('assessmentSelfT', {static: false}) assessmentSelfT: ElementRef;
  // @ViewChild('assessmentSelfC', {static: false}) assessmentSelfC: ElementRef;
  
  constructor(private _service: ServicesService) { }
  
  reviewArray: any;
  reviewSelfTS:String;
  assessmentSelfTS: String;
  reviewSelfCS:String;
  assessmentSelfCS: String;
  reviewSelfPS:String;
  assessmentSelfPS: String;
  // array : Object;
  id = "5e5bc9889dafbe6380096ca6";


  selectedAssessmentTS: String = this.assessmentSelfTS
  selectedAssessmentCS: String = this.assessmentSelfCS
  selectedAssessmentPS: String = this.assessmentSelfPS
  //  assessmentSelected: String = ''

  ngOnInit() {
    
    this.loadExistingData()
  }
  loadExistingData(){

    this._service.reviewData(this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data._id, "employeeId", "0").subscribe(res => {

      console.log(res);
      
      this.reviewArray = res[0];
      console.log(this.reviewArray)
      this.setExistingData();
    });

  }
  setExistingData(){
    console.log(this.reviewArray);
    this.reviewSelfTS= this.reviewArray.technicalSkill.selfEvaluation.comment;
    this.assessmentSelfTS=this.reviewArray.technicalSkill.selfEvaluation.assessment;
    
    this.reviewSelfCS= this.reviewArray.communication.selfEvaluation.comment;
    this.assessmentSelfCS=this.reviewArray.communication.selfEvaluation.assessment;
    
    this.reviewSelfPS= this.reviewArray.personality.selfEvaluation.comment;
    this.assessmentSelfPS=this.reviewArray.personality.selfEvaluation.assessment;
    
    console.log(this.reviewArray.personality.reviewerEvaluation.assessment);
    this.selectedAssessmentTS= this.assessmentSelfTS;
    this.selectedAssessmentCS=this.assessmentSelfCS;
    this.selectedAssessmentPS=this.assessmentSelfPS;

    }


  getReview() {
    this._service.getReviewById(this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data._id, "employeeId", "1").subscribe(res => {
      console.log(res);
      
      this.reviewArray = res[0];
        // console.log(this.reviewArray ,  "my dataaaaaaaaaaaaaa");

    this.reviewSelfTS= this.reviewArray.technicalSkill.selfEvaluation.comment;
    this.assessmentSelfTS=this.reviewArray.technicalSkill.selfEvaluation.assessment;

    
    
    this.reviewSelfCS= this.reviewArray.communication.selfEvaluation.comment;
    this.assessmentSelfCS=this.reviewArray.communication.selfEvaluation.assessment;

    this.reviewSelfPS= this.reviewArray.personality.selfEvaluation.comment;
    this.assessmentSelfPS=this.reviewArray.personality.selfEvaluation.assessment;

      });
  }

  submitReview(){
    let reviewObj =  {
      "submitted" :true
    }
    this._service.updateSelfReview(this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data._id, "reviewer", "0", reviewObj).subscribe(res =>  {
      console.log(this.res , "this is res");
      if(this.res.status==200){
        console.log('Successful update!!');
    
      }
      else {
        console.log('unsuccessful');
       
      }
    
    });
    this.updateSelfReview();

  }

  updateSelfReview(){
    console.log((this.rsTS , "printing"));
    let reviewObj = {
      "technicalSkill": {
        "selfEvaluation": {
        
          
            "comment": this.rsTS.nativeElement.value,
            "assessment": this.selectedAssessmentTS
        },
        
      },
     "communication": {
       "selfEvaluation": {
           "comment": this.rsCS.nativeElement.value,
           "assessment": this.selectedAssessmentCS
        },
      
    },
  "personality": {
    "selfEvaluation": {
        "comment": this.rsP.nativeElement.value,
        "assessment": this.selectedAssessmentPS
    }
    
  }

}
console.log(reviewObj);
this._service.updateSelfReview(this._service.jsonDecoder(localStorage.getItem("JwtHrms")).data._id, "reviewer", "0", reviewObj).subscribe(res =>  {
  console.log(res.ok , "this is res");
  if(res.ok==1){
    console.log(res, 'Here');
    const response = res;
    this.message = res;

    // setTimeout(() => {
    //   this.message = null;
    // }, 5000);
    console.log('Successful update!!');

  }
  else {
    console.log('unsuccessful');
   
  }

});


}

selectChangeHandlerTS(event: any){
  this.selectedAssessmentTS = event.target.value;
}
selectChangeHandlerCS(event: any){
  this.selectedAssessmentCS = event.target.value;
}
selectChangeHandlerPS(event: any){
  this.selectedAssessmentPS = event.target.value;
}

}
