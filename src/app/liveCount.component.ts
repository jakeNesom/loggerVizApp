import { Component, OnInit, Input, OnChanges, SimpleChange, 
        Output, EventEmitter, ChangeDetectionStrategy, ElementRef, ViewChild
      } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';
// For window animations
import {  trigger, state, animate, transition, style} from '@angular/animations';


import { DataManip } from './services/dataManip.service';
import { LoggerService } from './services/loggerdata.service';
import { Dataset } from './definitions/dataset';
import { DisplayComponent } from './display.component';
import { ChartModule } from 'angular2-highcharts';


@Component({
    selector: 'liveCount',
   
    styles: ['css/livecount.css',
    ],
    templateUrl: 'views/liveCount.html',
})

export class LiveCount {

    @Input() currentData: any;

    @Input() activelyLookForDataC: boolean;

    ngOnChanges(changes: any[]) {
        for (let key in changes) {
            if (key == "activelyLookForData") { console.log("activelyLookForData Key match  " + key); }

            if (key == "dataset") { this.processData(changes[key]); }
        }


    }


    constructor(public loggerService: LoggerService,
        public dataManip: DataManip, private _applicationRef: ApplicationRef,
        ) {

        this.range = "Last 30 min";
        this.options = {
            chart: {
                type: 'line',
                animation: true, // don't animate in old IE
                marginRight: 10,

                style: {
                    "min-width": "300px"
                },


            },
            title: {
                text: 'All nodes over time'
            },
            xAxis: {
                type: 'datetime',
                //tickPixelInterval: 30

            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                // formatter: function () {
                //     return '<b>' + this.series.name + '</b><br/>' +
                //        this.series.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                //        this.series.numberFormat(this.y, 2);

                // }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function (event:any) {
                            
                            dataManip.sendMessage(this.name, this.color);
                        }
                    }
                }
            },
            series: [
                {
                    name: 'Node 1',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -9; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                },
                {
                    name: 'Node 2',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -9; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                },
                {
                    name: 'Node 3',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -9; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                },
                {
                    name: 'Node 4',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -9; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                },
                {
                    name: 'Node 5',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -9; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                },
                {
                    name: 'Node 6',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -9; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                },

            ]


        };

       // this.chart["series"] = this.options.series;

    } /* End of constructor */

    /*********************************************
     Process Begins Here
    ***********************************************/


    public range:string

   

    // date set to test last 30 minutes data
    public testData = [

        { "_id": "591b3534e1c0b22070909374", "node": "node 1", "client": "client 3", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b22070909375", "node": "node 2", "client": "client 10", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b22070909376", "node": "node 6", "client": "client 9", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b22070909377", "node": "node 4", "client": "client 10", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b22070909378", "node": "node 6", "client": "client 5", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b22070909379", "node": "node 6", "client": "client 10", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b2207090937a", "node": "node 3", "client": "client 10", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b2207090937b", "node": "node 5", "client": "client 9", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b2207090937c", "node": "node 1", "client": "client 7", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b2207090937d", "node": "node 2", "client": "client 10", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b2207090937e", "node": "node 1", "client": "client 5", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b2207090937f", "node": "node 2", "client": "client 1", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b22070909380", "node": "node 5", "client": "client 7", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b22070909381", "node": "node 3", "client": "client 7", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) },
        { "_id": "591b3534e1c0b22070909382", "node": "node 2", "client": "client 9", "time": (new Date().getTime()) - (Math.floor(Math.random() * (1800000 - 60000) + 60000)) }

    ];


    ngOnInit(): void {

        //this.startInterval();
        this.getDataset( this.rangeToKey(this.range) );

       

        //this.tallyData();
    }

   
    public timeRangeArr = ["Last 5 min", "Last 30 min", "Last Hour", "Last 24 Hours",
        'Last Week', "Last Month", "ALL"];

    
    options: any;
    chart: any;
   
    private dataset: any;
    private oldOptions: any;


    public myInterval: any;
    public myInterval2: any;

    public activeClass = "btn-success";


    saveInstance(chartInstance: any) {
        this.chart = chartInstance;
        console.log("LiveCount saveInstance Fired");
    }

    sendMessage(message: string): void {
        this.dataManip.sendMessage(message);
    }

    clearMessage(): void {
        this.dataManip.clearMessage();
    }

    

    public setDataset(data: any) {
        this.dataset = data;
       
    }

    public getDataset( range:string ):void {
        this.loggerService.getRange2(range)
            .subscribe(data => { this.processData(data); });
    }

    processData(newData: any) {
        console.log("liveCount.processData() fired ");

        // set data variable
        this.setDataset(newData);
        this.tallyData(newData, this.rangeToKey(this.range) );
        //this.tallyData(this.dataset, this.range)

        // create x axis time interval array
        // count clients or nodes by time interval
        // populate chart

    }

    tallyData(data?: any, timeInterval?: string, type?: "node" | "client" ) {
        //data = this.testData;
        //timeInterval = "last30";
        type = "node";
        this.chart.title.update({ "text": "All nodes over " + this.range });
        let nodeArr = [];
        let currentTime = new Date().getTime();
        
        let startTime:number = 0;
        let timeMarker:number = 0;
        let intervalArr = [];
        let dataByNode: Object = {};

        currentTime = new Date().getTime();

        // get timespan in miliseconds from array in service
        for (let key in this.loggerService.timeIntObj)
        {
            if (key === timeInterval)
            {
                startTime = currentTime - this.loggerService.timeIntObj[key];
                timeMarker = Math.round(parseInt(this.loggerService.timeIntObj[key]) / 5);
                break;
            }
        }

        //populate intervArray
        for (let i = 0; i < 6; i++) {
            if (i == 0) { intervalArr[i] = startTime }
            else {

                intervalArr[i] = startTime + (i * timeMarker);

            }
        }

        // create node array  dataByNode.Nodex[timeMarker: ticker, timeMarker:ticker]
        for (let entry in data) {

            let node = data[entry][type];
            let time = data[entry].time;

            if (!dataByNode.hasOwnProperty(node)) {
                dataByNode[node] = [];
                nodeArr.push(node);
                //After this for loop - dataByNode.someNode[timeInMilliseconds : number of nodes (x val : y val)]
                for (let index in intervalArr) 
                {   
                    dataByNode[node][intervalArr[index]] = 0;
                }

            }

            // if the timestamp of the log falls between one of the timestamps in the intervalArr[], incriment the counter
            if (dataByNode[node] && time)
            {
                for (let i = 0; i < intervalArr.length; i++)
                {
                    let timeMarker = intervalArr[i];
                    let nextInterval = intervalArr[i + 1]

                    if (i < intervalArr.length - 1) {
                        if (time >= timeMarker && time <= nextInterval)
                        {
                            dataByNode[node][timeMarker]++; 
                            break;
                        }
                        
                    } else if (i == intervalArr.length - 1)
                    {
                        if (time >= timeMarker)
                        {
                            dataByNode[node][timeMarker]++;
                        }
                        
                    }
                    
                }

            } else { console.log("no dataByNode[node] or no 'time' set .") }


            //works!!
            
        }

        console.log(dataByNode);
        // Populate dataByNode.nodeX[0-5]
       
        
        // populate high-chart with new data

        

        //remove old serise from chart
        while (this.chart.series.length > 0)
        {
            this.chart.series[this.chart.series.length - 1].remove();
        }
        for (let j = 0; j < nodeArr.length; j++) {
            let node = nodeArr[j];
           
            let series = { "type": "spline", "name": node, "data": [{"x":0, "y": 0}], };
            for (let k = 0; k < intervalArr.length; k++)
            {
                let xMarker = intervalArr[k];
                series.data[k] = {
                    "x": xMarker, "y": dataByNode[node][xMarker]
                }

                
            }
            
            this.chart.addSeries(series);

            
        }
    }


    rangeChange(selection:any) {
        this.range = selection;

        this.getDataset( this.rangeToKey(selection) );
    }

   rangeToKey(input:string) {
        
        switch (input) {
            case "Last 5 min":
                return "lastFive";
                
            case "Last 30 min":
                return "last30";
               
            case "Last Hour":
                return "lastHour";
               
            case "Last 24 Hours":
                return "last24";
               
            case "Last Week":
                return "last7Days";
               
            case "Last Month":
                return "last30Days";

            case "ALL":
                return "ALL"
                
        };
    }
  

startInterval() {
        
        var _this = this; // setInterval acts on document so it messes up "this" reference
        this.myInterval = setInterval(function () {
            for (var i = 0; i < _this.chart.series.length; i++) {
                var x = (new Date()).getTime(), // current time
                    y = Math.random();

                console.log("Interval Iteration");

                _this.chart.series[i].addPoint([x, y], true, true);
            }
        }, 10000);
        
    }

startInterval2(type: "node" | "client" ) {
    var _this = this;

    // initially set time interval
    var prevTime = (new Date()).getTime();

    // whatever current time is of interval iteration
    var currentTime = (new Date()).getTime();

    this.myInterval2 = setInterval(function () {
        let dataCounts = this.countData(prevTime, currentTime, this.dataset, type);
        for (var i = 0; i < _this.chart.series.length; i++) {
            var x = []
        }

        prevTime = currentTime;
    }, 5000)  // interval set to 5 seconds
    }

stopInterval() {
    clearInterval(this.myInterval);
    console.log("interval cleared");
}


    countData(time1: number, time2: number, incomingData: any, type: "node" | "client" ) {
        let dataCount: any = []
        for (let i = 0; i < incomingData.length; i++)
        {
            if (incomingData[i].time > time1 && incomingData[i].time < time2)
            {
                if (incomingData[i][type] in dataCount)
                {
                    dataCount[type]++;
                } else {
                    dataCount[type] = 1;
                }
            }
        }
    }
} // end of component

