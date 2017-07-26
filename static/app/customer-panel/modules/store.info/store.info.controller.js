angular.module("storeinfoModule",["Directives","satellizer"]).controller("storeinfoController",["$scope","$stateParams","$http","$state","$auth","$filter","$sce","$ocLazyLoad","$rootScope","$compile","StoreQuery","$q",function(e,o,t,n,r,s,a,i,c,u,l,p){if(e.favorites={},e.comment={},e.filter={category:{},wallet:{},bank:{},city:{},brands:{},festivals:{}},e.search={category:void 0,wallet:void 0,bank:void 0,city:void 0,brands:void 0,festivals:void 0},e.showMore={all:{},deals:{},coupons:{}},e.store={},e.coupons=[],e.expiredCoupons=[],e.suggestedCoupons=[],e.relatedCoupons=[],e.filterCoupons=[],e.categories={},e.trustAsHtml=function(e){if(e)return a.trustAsHtml(e)},e.showDescription=function(e){$(".show-description").hide(),$("#show-desc-"+e).fadeIn(200)},e.closeDescription=function(){$(".show-description").fadeOut()},e.manageFavorite=function(o,t){var n=!e.favorites[t];if(!r.isAuthenticated())return!0;var s={url:"/api/1.0/persons/"+e.user._id,method:"PATCH",data:{}},a=e.user[o].indexOf(t);n?-1==a&&e.user[o].push(t):e.user[o].splice(a,1),s.data[o]=e.user[o],l.postFav(s).then(function(o){console.log("Success Store Favorite: ",o),e.favorites[t]=n},function(e){console.log(e)})},e.applyFilter=function(){e.filterCoupons=s("couponFilter")(e.coupons,e.filter),e.dealsLength=s("filter")(e.filterCoupons,{coupon_type:"offer"}),e.couponsLength=s("filter")(e.filterCoupons,{coupon_type:"coupon"})},e.openCouponCode=function(e,o){var t="/api/1.0/coupons/"+o._id+"?number_of_clicks=1";l.get(t),e.store_url&&setTimeout(function(){},500),t=n.href("main.store-info",{url:e.url,cc:o._id}),window.open(t,"_blank")},$("#top_banner_area").hide(),o.url){var f={};f.recommended_stores=1,f.related_categories=1,f.top_stores=1,f.related_stores=1,f.related_deals=1;var d="/api/1.0/stores/"+o.url+"?embedded="+JSON.stringify(f)+"&number_of_clicks=1";l.get(d).then(function(o){if(console.log(o),o.data){o.data||n.go("404"),e.store=o.data,e.store.related_stores=clearNullIds(e.store.related_stores),e.store.top_stores=clearNullIds(e.store.top_stores),e.store.related_deals=clearNullIds(e.store.related_deals),e.store.toDayDate=new Date,e.store.voting=Math.floor(201*Math.random())+300,c.pageTitle=e.store.meta_title,$("title").text(e.store.meta_title),c.pageDescription=e.store.meta_description,e.favorites[e.store._id]=!1,console.log(e.user.fav_stores),angular.forEach(e.user.fav_stores,function(o){o==e.store._id&&(e.favorites[e.store._id]=!0)}),console.log(e.store),f={related_categories:1,related_stores:1},f=JSON.stringify(f);var t={};if(t.recommended_stores={$in:[e.store._id]},r="/api/1.0/coupons?where="+JSON.stringify(t)+"&embedded="+f,l.get(r).then(function(o){console.log("Suggested Coupons Data: ",o.data._items),e.suggestedCoupons=o.data._items}),t={related_stores:{$in:[e.store._id]}},r="/api/1.0/coupons?where="+JSON.stringify(t)+"&embedded="+f,console.log("url ------------------------------ ",r),l.get(r).then(function(o){var n=o.data._items,a=[];console.log("Stores Coupons Data: ",n),angular.forEach(n,function(o){if(console.log(e.user.fav_coupons),angular.forEach(e.user.fav_coupons,function(t){t==o._id&&(e.favorites[o._id]=!0)}),angular.forEach(o.related_categories,function(o){if(null==o)return!0;e.categories[o.category_type]?s("filter")(e.categories[o.category_type],{_id:o._id}).length||e.categories[o.category_type].push(o):(e.categories[o.category_type]=[],e.categories[o.category_type].push(o))}),new Date(o.expire_date)>new Date){if(o._updated=new Date(o._updated),-1==e.coupons.indexOf(o)){e.coupons.push(o),e.filterCoupons.push(o),e.dealsLength=s("filter")(e.filterCoupons,{coupon_type:"offer"}),e.couponsLength=s("filter")(e.filterCoupons,{coupon_type:"coupon"});var n=JSON.stringify({user:1});t=JSON.stringify({coupon:o._id,status:!0}),r="/api/1.0/coupons_comments?embedded="+n+"&where="+t,a.push(l.get(r).then(function(e){return console.log(e.data._items),e}))}}else-1==e.expiredCoupons.indexOf(o)&&e.expiredCoupons.push(o)}),p.all(a).then(function(o){console.log("Comments Are: ",o,"Coupons: ",e.coupons);var t=[];angular.forEach(o,function(e){angular.forEach(e.data._items,function(e){t.push(e)})}),angular.forEach(e.coupons,function(e){e.comments=[],angular.forEach(t,function(o){o._created=new Date(o._created),o.coupon==e._id&&e.comments.push(o)})}),e.filterComments=angular.copy(e.coupons)})}),angular.forEach(e.store.related_stores,function(o){console.log("Related Stores: ",o.name,o._id),t=JSON.stringify(t={related_stores:{$in:[o._id]}});r="/api/1.0/coupons?where="+t+"&max_results=1&sort=[('_updated', -1)]&embedded="+f,l.get(r).then(function(o){var t=o.data._items;console.log("Related Coupons: ",t),angular.forEach(t,function(o){s("filter")(e.relatedCoupons,{_id:o._id}).length||e.relatedCoupons.push(o)})})}),0==e.store.top_stores.length){l.get('/api/1.0/stores?where={"featured_store": true}&max_results=2').then(function(o){console.log(o),o.data._items&&(e.store.top_stores=o.data._items,angular.forEach(e.store.related_stores,function(o){angular.forEach(e.store.top_stores,function(t,n){t._id==o._id&&e.store.top_stores.splice(n,1)})}))},function(e){console.log(e)})}console.log("Final categories are ",e.categories),console.log(e.expiredCoupons,e.coupons,"suggested coupons ",e.suggestedCoupons,"Related coupons ",e.relatedCoupons)}e.top_banner={};var r="/api/1.0/banner?where="+JSON.stringify({top_banner_string:"store"});l.get(r).then(function(o){console.log("banner Details: ",o.data._items),e.top_banner=o.data._items[0],$("#top_banner_area").show()})},function(e){console.log(e)})}else n.go("main.home");e.openComment=function(o){if(console.log("Comment Coupon Item: ",o),$("comments").remove(),r.isAuthenticated()){e.info={item:o,token:r.getToken()};var t=u("<comments info='info'></comments>")(e);$("body").append(t),setTimeout(function(){$("#commentPopup").modal("show")},1e3),console.log(t)}else n.go("main.login")},e.openReport=function(o){if(console.log("Report Coupon Item: ",o),$("reports").remove(),r.isAuthenticated()){e.info={item:o,token:r.getToken()};var t=u("<reports info='info'></reports>")(e);$("body").append(t),setTimeout(function(){$("#reportPopup").modal("show")},1e3),console.log(t)}else n.go("main.login")},o.cc&&($("coupon-info-popup").remove(),e.$watch("coupons",function(t,n){console.log(t,n),t&&angular.forEach(t,function(t){if(t._id==o.cc){e.couponInfo=t;var n=u("<coupon-info-popup parent='store' type='store' coupon='couponInfo'></coupon-info-popup>")(e);$("body").append(n),setTimeout(function(){$("#couponPopup").modal("show")},1e3),console.log(n)}})},!0))}]).filter("couponFilter",function(){return function(e,o){var t=[];if(!(Object.keys(o.category).length||Object.keys(o.wallet).length||Object.keys(o.bank).length||Object.keys(o.city).length||Object.keys(o.brands).length||Object.keys(o.festivals).length))return e;var n=0;return angular.forEach(o,function(e,o){angular.forEach(e,function(e,o){1==e&&n++})}),0==n?e:(angular.forEach(e,function(e){angular.forEach(e.related_categories,function(n){angular.forEach(o,function(o,r){angular.forEach(o,function(o,r){n&&1==o&&r==n._id&&-1==t.indexOf(e)&&t.push(e)})})})}),t)}}).factory("StoreQuery",["$http","$q",function(e,o){return{postFav:function(t){var n=o.defer();return e(t).then(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},get:function(t){var n=o.defer();return e({url:t+"&r="+Math.random(),method:"GET"}).then(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]);