'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const modifiedEvent = event;
    
    if(event.triggerSource==='PreAuthentication_Authentication'){
        if(event.userName.indexOf('@hdbank.com.vn')>-1){
            console.log('Detect HDBank user => Call HDBank AD Server to authorize user fail');
            return false;
        }
    }

    // Check for the event type
    if (event.eventType === 'SyncTrigger') {
        // Modify value for a key
        if ('SampleKey1' in event.datasetRecords) {
            modifiedEvent.datasetRecords.SampleKey1.newValue = 'ModifyValue1';
            modifiedEvent.datasetRecords.SampleKey1.op = 'replace';
        }

        // Remove a key
        if ('SampleKey2' in event.datasetRecords) { 
            modifiedEvent.datasetRecords.SampleKey2.op = 'remove';
        }

        // Add a key
        if (!('SampleKey3' in event.datasetRecords)) {
            modifiedEvent.datasetRecords.SampleKey3 = {
                newValue: 'ModifyValue3',
                op: 'replace',
            };
        }
    }

    callback(null, modifiedEvent);
};
