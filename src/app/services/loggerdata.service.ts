import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Dataset } from '../definitions/dataset';

@Injectable ()
export class LoggerService {

    //private loggerUrl = 'api/loggerData';
    private loggerUrl = 'http://localhost:3039/read/getall/';
    private filterUrl = 'http://localhost:3039/read/filterget';

    private subject = new Subject<any>();

    // time in milliseconds - used in filtering dataset by time
    public timeIntObj = {
        'lastFive': 300000,
        'last30': 1800000,
        'lastHour': 3600000,
        'last24': 86400000,
        'last7Days': 604800000,
        'last30Days': 2592000000,
        'ALL': 2592000000 * 24

    };

    public data: any;

    constructor(private http: Http)
    { }


    // rxjs subject 
    //// http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject

    private vm = this;
    sendMessage(message: any) {
        this.subject.next({ data: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable <any> {
        return this.subject.asObservable();
    }



    getClients(): Promise<any> {
        return 
    }

    getLoggerData(): Promise <Dataset[]> {
        
        
        return this.http.get(this.loggerUrl)
            .toPromise()
             .then( function( response ) { 
                 
                 return response.json() as Dataset[]; 
            })  
            //.then(response => response.json().data as Dataset[])
            .catch(this.handleError);
    }

    
    getRangeA(filter:Object): Promise <Dataset[]> {
        let filterStr = JSON.stringify(filter);
        const url = this.filterUrl + '$filter=' + filterStr;
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then( function(response) { 
                console.log("Response from server: " + response as Object);
                return response.json()
            })
            .catch( this.handleError);
    }

    // POST version
    getRange(data: Object): Observable <any> {
        console.log( "data being sent " + JSON.stringify(data) );
        let headers = new Headers({'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = this.filterUrl;

        return this.http.post(url, JSON.stringify(data), options)
            .map(this.extractData )
            .catch(this.handleError);
    }

    getRange2(time?:string): Observable<any>
    {
        let stopTime = new Date().getTime();
        let startTime;
        if (time) {
            for (let key in this.timeIntObj) {
                if (time === key) {
                    startTime = stopTime - this.timeIntObj[key];
                }
            }
        } else { startTime = new Date().getTime(); }

        let data = {
            "data": {
                "startTime": startTime,
                "stopTime": stopTime
            }
        };


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = this.filterUrl;

        return this.http.post(url, JSON.stringify(data), options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    private extractData(res: Response) {
        
        console.log(".map filred, .extractData fired" );
        let body = res.json();
        //console.log("body: " + JSON.stringify(body) );
        return body || { };
    }
    private handleError(error: any): Promise <any> {
       
        console.error('An error occured', error);
        return Promise.reject(error.message || error );
    }
}