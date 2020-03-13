import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  
  constructor(private _service: ServicesService, private _activatedRoute: ActivatedRoute, private _router: Router) { }
  
  reviewArray: any;
  reviewSelfTS: String;

  assessmentSelfTS: String;
  reviewSelfCS: String;

  assessmentSelfCS: String;
  reviewSelfPS: String;

  assessmentSelfPS: String;
  reviewId: string;

  selectedAssessmentTS: String = this.assessmentSelfTS;
  selectedAssessmentCS: String = this.assessmentSelfCS;
  selectedAssessmentPS: String = this.assessmentSelfPS;

  isReadonly = true;
  editable = true;
  current_route: string;
  isVisible = false;

  ngOnInit() {
    this.current_route = this._router.url.split('/')[2];
    this._activatedRoute.params.subscribe(param => {
      this.reviewId = param.id;
    });
    this.loadExistingData(this.reviewId);
  }

  loadExistingData(reviewId: string){
    this._service.reviewDataById(reviewId, this.current_route).subscribe(res => {
      if(res.status == 200){
        this.reviewArray = res.body[0];
        if(this.reviewArray.flag == "0"){
          this.isReadonly = false;
          this.editable = false;
          this.setExistingData();
        }
        else{
          this.setExistingData();
        }
      }
      else if(res.status == 401){
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
    });
  }

  setExistingData(){
    this.reviewSelfTS= this.reviewArray.technicalSkill.selfEvaluation.comment;
    this.assessmentSelfTS=this.reviewArray.technicalSkill.selfEvaluation.assessment;
    
    this.reviewSelfCS= this.reviewArray.communication.selfEvaluation.comment;
    this.assessmentSelfCS=this.reviewArray.communication.selfEvaluation.assessment;
    
    this.reviewSelfPS= this.reviewArray.personality.selfEvaluation.comment;
    this.assessmentSelfPS=this.reviewArray.personality.selfEvaluation.assessment;
    
    this.selectedAssessmentTS= this.assessmentSelfTS;
    this.selectedAssessmentCS=this.assessmentSelfCS;
    this.selectedAssessmentPS=this.assessmentSelfPS;
  }

  submitReview(){
    this.updateSelfReview();
    let reviewObj =  {
      "flag": "1",
      "status": "Pending-Reviewer" 
    };
    this._service.updateSelfReview(this.reviewId, reviewObj).subscribe(res =>  {
      if(res.status == 200){
          this.isVisible = true;
          setTimeout(()=> { 
            this._router.navigate(["/user/reviews"]);
            this.isVisible = false;
          }, 1000);
      }
      else if(res.status == 401) {
        alert("Token Expired");
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
      else{
        alert("Some Error Occured");
      }
    });
    
  }

  updateSelfReview(){
    let reviewObj = {
      "technicalSkill": {
        "selfEvaluation": {
            "comment": this.reviewSelfTS,
            "assessment": this.assessmentSelfTS
        }
      },
     "communication": {
       "selfEvaluation": {
           "comment": this.reviewSelfCS,
           "assessment": this.assessmentSelfCS
        }
      },
      "personality": {
        "selfEvaluation": {
          "comment": this.reviewSelfPS,
          "assessment": this.assessmentSelfPS
        }
      }
    };
    this._service.updateSelfReview(this.reviewId, reviewObj).subscribe(res => {
      if(res.status == 200){

      }
      else if(res.status == 401){
        localStorage.removeItem("JwtHrms");
        this._router.navigate(['/login']);
      }
    });
  }

  selectChangeHandlerTS(event: any){
    this.assessmentSelfTS = event.target.value;
  }
  selectChangeHandlerCS(event: any){
    this.assessmentSelfCS = event.target.value;
  }
  selectChangeHandlerPS(event: any){
    this.assessmentSelfPS = event.target.value;
  }

}