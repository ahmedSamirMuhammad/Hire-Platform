import { Component, Input } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';
import{HttpHeaders} from'@angular/common/http'

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent {
  @Input() candidate: any;

  constructor(private candidateCrud : CandidateService){

  }
 ngOnInit(){
  console.log(`from child  ${this.candidate}`);
  
}
  delete(id:any){
    const jobId = 2; 
    this.candidateCrud.deleteCandidate(id).subscribe( res=>{
      console.log('deleted');
      
    })

  }
}
