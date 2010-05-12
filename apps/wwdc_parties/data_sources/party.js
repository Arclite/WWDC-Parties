// ==========================================================================
// Project:	  WwdcParties.PartyDataSource
// Copyright: ©2010 Cocoatype, LLC
// ==========================================================================

sc_require('models/party');
WWDCParties.PARTIES_QUERY = SC.Query.local(WWDCParties.Party, {orderBy: 'startTime, name'});

WWDCParties.PartyDataSource = SC.DataSource.extend(
{
	fetch: function(store, query)
	{
		if (query === WWDCParties.PARTIES_QUERY) {
			SC.Request.getUrl('/parties').json().notify(this, 'didFetchParties', store, query).send();
			return YES;
		}
		
		return NO;
	},
	
	didFetchParties: function(response, store, query)
	{
		if (SC.ok(response)) {
			var dataHashes = response.get('body').content;
			store.loadRecords(WWDCParties.Party, dataHashes);
			store.dataSourceDidFetchQuery(query);
		} else store.dataSourceDidErrorQuery(query, response);
	},

	retrieveRecord: function(store, storeKey) {
		if (SC.kindOf(store.recordTypeFor(storeKey), WWDCParties.Party)) {
			var url = store.idFor(storeKey);
			SC.Request.getUrl(url).json().notify(this, 'didRetrieveParty', store, storeKey).send();
			return YES;
		} else return NO;
	},
		
	didRetrieveParty: function(response, store, storeKey) {
		if (SC.ok(response)) {
			var dataHash = response.get('body').content;
			store.dataSourceDidComplete(storeKey, dataHash);
		} else store.dataSourceDidError(storeKey, response);
	},
	
	createRecord: function(store, storeKey)
	{
		return NO;
	},
	
	updateRecord: function(store, storeKey)
	{
		return NO;
	},
	
	destroyRecord: function(store, storeKey)
	{
		return NO;
	}
});