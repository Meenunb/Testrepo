import { LightningElement } from 'lwc';
import fetchAccounts from '@salesforce/apex/autoSearch.fetchAccounts';   


export default class AutoSearch extends LightningElement {
    accounts;  
    error;  
    searchKey;
    searchKey;
    selectedAccountId;

    handleChange( event ) {

        this.searchKey = event.detail.value;
        console.log( 'searchKey is', this.searchKey );

        if ( this.searchKey ) {  
            fetchAccounts( { searchKey: this.searchKey } )    
            .then( result => { 
                console.log( 'result is', JSON.stringify( result ) );
                this.accounts = result;
            } )  
            .catch( error => { 
                console.log( 'Error Occured', JSON.stringify( error ) );
                this.error = error; 
            } );  
        } else  {
            this.accounts = undefined;
        }
    }
    handleSelect( event ) {
        
        let strIndex = event.currentTarget.dataset.id;
        console.log( 'strIndex is', strIndex );
        let tempRecs =  JSON.parse( JSON.stringify( this.accounts ) );
        let selectedRecId = tempRecs[ strIndex ].Id;
        console.log( 'Record Id is', selectedRecId );
        let strAccName = tempRecs[ strIndex ].Name;
        console.log( 'Name Id is', strAccName );
        this.selectedAccountId = selectedRecId;
        this.searchKey = strAccName;
        this.accounts = undefined;
    }
}