import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubmissionResponseModel} from "../../model/response/submission-response.model";
import {CommonResponse} from "../../model/response/common-response.model";
import {AcceptRejectRequest} from "../../model/request/accept-reject-request.model";

@Injectable({
  providedIn: 'root'
})

export class SubmissionService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(minLoanAmount?: string, maxLoanAmount?: string,
         page?: string, size?: string
  ): Observable<CommonResponse<SubmissionResponseModel[]>> {
    const params: HttpParams = new HttpParams()
      .set('minLoanAmount', minLoanAmount || '')
      .set('maxLoanAmount', maxLoanAmount || '')
      .set('page', page || '')
      .set('size', size || '');

    return this.http.get<CommonResponse<SubmissionResponseModel[]>>('/angular/api/submissions', {params});
  }

  accept(submissionId: string): Observable<any> {
    const body: AcceptRejectRequest = {
      id: submissionId,
      isApprove: true
    };
    console.log(body)
    return this.http.put('/angular/api/submissions', body);
  }

  reject(submissionId: string): Observable<any> {
    const body: AcceptRejectRequest = {
      id: submissionId,
      isApprove: false
    };
    console.log(body)
    return this.http.put('/angular/api/submissions', body);
  }
}
