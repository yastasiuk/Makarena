module.exports = {
  scenarios: [
    {
      name: 'Non-scroller',
      test: '.hm-TabletNavButtons',
      mappings: {
        
      }
    },
    {
      name: 'Scroller',
      test: '.hm-HeaderScroller',
      mappings: {
        sportsLink: '.hm-HeaderScroller_HScroll .hm-HeaderMenuItem',
      }
    }
  ]
}
