import Request from './request'

class IndexModel extends Request {
  getMonthSales() {
    return this.getData({
      url: '/monthly/sales',
      parmas: {
        top: 5
      }
    }) 
  }
  getBrandSales() {
    return this.getData({
      url: '/brand/sales/proportion',
    }) 
  }
  getPerformance() {
    return this.getData({
      url: '/sales/performance'
    })
  }
  getCategorySales() {
    return this.getData({
      url: '/category/sales/amount',
      parmas: {
        top: 3
      }
    })
  }
  getProductList() {
    return this.getData({
      url: '/product/list',
      parmas: {
        top: 10
      }
    })
  }
  getNationalSales() {
    return this.getData({
      url: '/national/sales/amount'
    })
  }
}

export default IndexModel