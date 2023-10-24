import { Component } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';
import{HttpHeaders} from'@angular/common/http'

@Component({
  selector: 'app-manage-candidates',
  templateUrl: './manage-candidates.component.html',
  styleUrls: ['./manage-candidates.component.scss']
})
export class ManageCandidatesComponent {
  constructor(private candidateCrud:CandidateService){

  }
  candidates:any = [];
  ngOnInit():void{
    const headers = new HttpHeaders({
      'Authorization': '4|8QGwgrSAETNQodopxnoffbBEVOWaGiP3G01aysXS5b78b5a5'
    });
    
    this.candidateCrud.getAllCandidates({ headers }).subscribe( (res)=>{
      this.candidates = res;
      console.log(this.candidates);
      })
      
  }
}
