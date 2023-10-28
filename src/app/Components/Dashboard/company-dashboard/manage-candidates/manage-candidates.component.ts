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
  candidates:any[] = [];
  ngOnInit():void{

    
    this.candidateCrud.getAllCandidates().subscribe( (res)=>{
      this.candidates = res.data;
      console.log(this.candidates);
      })
      
  }

}
