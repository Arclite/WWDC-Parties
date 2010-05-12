// ==========================================================================
// Project:   WWDCParties
// Copyright: ©2010 Cocoatype, LLC
// ==========================================================================

WWDCParties.main = function main() {
	WWDCParties.getPath('mainPage.mainPane').append();

	var allParties = WWDCParties.store.find(WWDCParties.PARTIES_QUERY);
	WWDCParties.partiesController.set('content', allParties);
};

function main() { WWDCParties.main(); }