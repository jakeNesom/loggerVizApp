import { Injectable } from '@angular/core';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Dataset } from '../definitions/dataset';

@Injectable()
export class DataManip {

    public data: any;
    public clientArr: any[] = [];
    public nodeArr: any[] = [];

    /*
    public timeIntObj = {
        'lastFive': {
            'time': 300000,
            'interval': function () {
                let arr = [];
                for (let i = 5; i > -1; i--) {
                    arr[i] = 6000 * (i + 1);
                }
                return arr;
            }
        },
        'last30': {
            'time': 1800000,
            'interval': function () {
                let arr = [];
                for (let i = 5; i > -1; i--) {
                    arr[i] = 36000 * (i + 1);
                }
                return arr;
            }
        },
        'lastHour': {
            'time': 3600000,
            'interval': function () {
                let arr = [];
                for (let i = 5; i > -1; i--) {
                    arr[i] = 72000 * (i + 1);
                }
                return arr;
            }
        },
        'last24': {
            'time': 86400000,
            'interval': function () {
                let arr = [];
                for (let i = 5; i > -1; i--) {
                    arr[i] = 17280000 * (i + 1);
                }
                return arr;
            }
        },
        'last7days': {
            'time': 604800000,
            'interval': function () {
                let arr = [];
                for (let i = 6; i > -1; i--) {
                    arr[i] = 86400000 * (i + 1);
                }
                return arr;
            }
        },
        'last30Days': {
            'time': 2592000000,
            'interval': function () {
                let arr = [];
                let multip = 16;
                for (let i = 0; i < 6; i++) {
                    arr[i] = 86400000 * multip;
                    multip /= 2;
                }
                return arr;
            }
        },
        'ALL': 0

    }; */


    setListArr(data:any, type: "client" | "node" ) {
        
        let arr: any[] = [];

        for (let entry in data)
        {
            let hasProp = false;
            for (let item in arr)
            {
                if (arr[item] == data[entry][type])
                {
                    hasProp = true;
                    break;
                }
            }
            if (hasProp === false) {
                arr.push(data[entry][type]);
            }
            
        }
        return arr;
    }

    filterDataset(data:any, itemName: any, type: "node" | "client") {
        
        let i = 0;
        while (i < data.length)
        {
            if (data[i][type] != itemName)
            {
                data.splice(i, 1);
            } else i++
        }

        return data;
    }

    filterDataByClient() {

    }

    // On Subjects / Observables 
    // http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject
    private subject = new Subject<any>();

    sendMessage(message: string, message2?: string) {
        this.subject.next({ text: message, text2: message2 });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }



    seriesName: string;

    selected(type: string) {
        
    }

    graphClicked(name: string) {
        this.seriesName = name;
    }
}