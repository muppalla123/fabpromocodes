angular.module("categoryinfoModule",["Directives","satellizer","APP"]).controller("categoryinfoCtrl",["$scope","$state","$filter","$ocLazyLoad","$sce","Query","$q","$stateParams","$http","$rootScope","$compile","$auth","DestionationUrl","SEO",function(e,o,t,r,a,n,s,i,l,c,u,p,d,g){if(e.favorites={},e.filter={store:{},wallet:{}},e.showMore={all:{},deals:{},coupons:{}},e.params=void 0,e.search={store:void 0,wallet:void 0},e.category=void 0,e.coupons=[],e.filterCoupons=[],e.expiredCoupons=[],e.categories={},e.stores=[],e.manageFavorite=function(o,t){var r=!e.favorites[t];if(!p.isAuthenticated())return!0;console.log(o,e.user[o],t);var a={url:"/api/1.0/persons/"+e.user._id,method:"PATCH",data:{}},n=e.user[o].indexOf(t);r?-1===n&&e.user[o].push(t):e.user[o].splice(n,1),a.data[o]=e.user[o],StoreQuery.postFav(a).then(function(o){console.log("Success Store Favorite: ",o),e.favorites[t]=r},function(e){console.log(e)})},e.trustAsHtml=function(e){return a.trustAsHtml(e)},e.applyFilter=function(){e.filterCoupons=t("couponFilter")(e.coupons,e.filter),e.dealsLength=t("filter")(e.filterCoupons,{coupon_type:"offer"}),e.couponsLength=t("filter")(e.filterCoupons,{coupon_type:"coupon"})},e.openCouponCode=function(e,t){d.destination_url(t.destination_url).then(function(r){var a=r.data.data.output_url,n=a||t.destination_url;url=o.href("main.categoryinfo",{url:e.url,cc:t._id,destionationUrl:n}),$('<a href="'+url+'" target="_blank">&nbsp;</a>')[0].click(),window.location.href=n},function(e){console.log(e)})},i.url){var f={};f.url=i.url;var _={};_.related_categories=1,_.top_stores=1,url="/api/1.0/categories/"+i.url+"?embedded="+JSON.stringify(_)+"&r="+Math.random(),l({url:url,method:"GET"}).then(function(o){if(console.log(o),o.data){e.category=o.data,e.category.toDayDate=new Date,e.category.voting=Math.floor(201*Math.random())+300,e.category.top_stores=clearNullIds(e.category.top_stores),e.category.related_categories=clearNullIds(e.category.related_categories),e.category.top_categories=clearNullIds(e.category.top_categories),e.category.related_deals=clearNullIds(e.category.related_deals),e.category.related_coupons=clearNullIds(e.category.related_coupons);var r={meta_title:e.category.seo_title,meta_description:e.category.seo_description};g.seo({},r,"");var a={related_categories:{$in:[e.category._id]},status:"Publish"};_=JSON.stringify({related_stores:1,related_categories:1}),url="/api/1.0/coupons?where="+JSON.stringify(a)+"&max_results=1000&&sort=-_updated&embedded="+_,l.get(url).then(function(o){var r=o.data._items;console.log("All related Coupons Data; ",o,r),angular.forEach(r,function(o){o._updated=new Date(o._updated),new Date(o.expire_date)>new Date&&-1===e.coupons.indexOf(o)&&(e.coupons.push(o),e.filterCoupons.push(o),e.dealsLength=t("filter")(e.filterCoupons,{coupon_type:"offer"}),e.couponsLength=t("filter")(e.filterCoupons,{coupon_type:"coupon"})),angular.forEach(o.related_categories,function(o){if(null===o)return!0;e.categories[o.category_type]?t("filter")(e.categories[o.category_type],{_id:o._id}).length||e.categories[o.category_type].push(o):(e.categories[o.category_type]=[],e.categories[o.category_type].push(o))}),angular.forEach(o.related_stores,function(o){t("filter")(e.stores,{_id:o._id}).length||e.stores.push(o)}),console.log(e.stores,e.coupons,"categories",e.categories)})},function(e){console.log(e)})}e.category.top_banner||(e.top_banner={},f=JSON.stringify({top_banner_string:"category",expired_date:{$gte:(new Date).toGMTString()}}),url="/api/1.0/banner?where="+f,n.get(url).then(function(o){console.log("banner Details: ",o.data._items),e.top_banner=o.data._items[0],$("#top_banner_area").show()})),e.category.side_banner||(e.side_banner={},f=JSON.stringify({side_banner_string:"category",expired_date:{$gte:(new Date).toGMTString()}}),url="/api/1.0/banner?where="+f,n.get(url).then(function(o){console.log("Side banner Details: ",o.data._items),e.side_banner=o.data._items[0]}))},function(e){console.log(e),o.go("404")})}else o.go("main.category");i.cc&&($("coupon-info-popup").remove(),_=JSON.stringify({related_stores:1,related_categories:1}),url="/api/1.0/coupons/"+i.cc+"?number_of_clicks=1&&embedded="+_+"&rand="+Math.random(),l.get(url).then(function(o){console.log("$stateParams CC Data: ",o.data),e.couponInfo=o.data;var t=u("<coupon-info-popup parent='category' type='category' coupon='couponInfo'></coupon-info-popup>")(e);$("body").append(t),setTimeout(function(){$("#couponPopup").modal("show")},1e3),console.log(t)},function(e){console.log("$stateParams CC: ",e),o.go("main.categoryinfo",{cc:void 0,destionationUrl:void 0})}))}]).filter("couponFilter",function(){return function(e,o){var t=[];if(!Object.keys(o.store).length&&!Object.keys(o.wallet).length)return e;var r=0;return angular.forEach(o,function(e,o){angular.forEach(e,function(e,o){!0===e&&r++})}),0===r?e:(angular.forEach(e,function(e){angular.forEach(o,function(o,r){angular.forEach(o,function(o,r){angular.forEach(e.related_stores,function(a){a&&!0===o&&r===a._id&&-1===t.indexOf(e)&&t.push(e)}),angular.forEach(e.related_categories,function(a){console.log("Related Category: ",a),a&&!0===o&&r===a._id&&-1===t.indexOf(e)&&t.push(e)})})})}),t)}}).factory("Query",["$http","$q",function(e,o){return{get:function(t){var r=o.defer();return e({url:t+"&r="+Math.random(),method:"GET"}).then(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]).directive("ddTextCollapse",["$compile","$sce",function(e,o){return{restrict:"A",scope:!0,link:function(o,t,r){function a(e){return e?String(e).replace(/<[^>]+>/gm,""):""}o.collapsed=!1,o.toggle=function(){o.collapsed=!o.collapsed},r.$observe("ddTextCollapseText",function(n){n=a(n);var s=o.$eval(r.ddTextCollapseMaxLength);if(n.length>s){var i=String(n).substring(0,s),l=String(n).substring(s,n.length),c=e("<span>"+i+"</span>")(o),u=e('<span ng-if="collapsed">'+l+"</span>")(o),p=e('<span ng-if="!collapsed">... </span>')(o),d=e('<br ng-if="collapsed">')(o),g=e('<span style="cursor: pointer; color: #165ba8;" class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "Show Less" : "Show More"}}</span>')(o);t.empty(),t.append(c),t.append(u),t.append(p),t.append(d),t.append(g)}else t.empty(),t.append(n)})}}}]);