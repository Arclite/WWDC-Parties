// ==========================================================================
// Project:   WWDCParties.Party
// Copyright: ©2010 Cocoatype, LLC
// ==========================================================================

WWDCParties.Party = SC.Record.extend(
{
	name: SC.Record.attr(String),
	location: SC.Record.attr(String),
	streetAddress: SC.Record.attr(String),
	city: SC.Record.attr(String),
	startTime: SC.Record.attr(SC.DateTime, {format: '%Y-%m-%d %H:%M:%S'}),
	moreInfo: SC.Record.attr(String)
});
