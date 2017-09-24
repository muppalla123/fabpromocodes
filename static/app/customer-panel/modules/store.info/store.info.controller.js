angular.module("storeinfoModule",["Directives","satellizer","APP"]).controller("storeinfoController",["$scope","$stateParams","$http","$state","$auth","$filter","$sce","$ocLazyLoad","$rootScope","$compile","StoreQuery","$q","DestionationUrl","SEO",function(e,t,o,n,r,a,s,i,l,c,d,u,p,f){if(e.favorites={},e.comment={},e.filter={category:{},wallet:{},bank:{},city:{},brands:{},festivals:{}},e.search={category:void 0,wallet:void 0,bank:void 0,city:void 0,brands:void 0,festivals:void 0},e.showMore={all:{},deals:{},coupons:{}},e.store={},e.coupons=[],e.expiredCoupons=[],e.suggestedCoupons=[],e.relatedCoupons=[],e.filterCoupons=[],e.categories={},e.trustAsHtml=function(e){if(e)return s.trustAsHtml(e)},e.showDescription=function(e){$(".show-description").hide(),$("#show-desc-"+e).fadeIn(200)},e.closeDescription=function(){$(".show-description").fadeOut()},e.applyFilter=function(){e.filterCoupons=a("couponFilter")(e.coupons,e.filter),e.dealsLength=a("filter")(e.filterCoupons,{coupon_type:"offer"}),e.couponsLength=a("filter")(e.filterCoupons,{coupon_type:"coupon"})},e.openCouponCode=function(e,t){p.destination_url(t.destination_url).then(function(o){var r=o.data.data.output_url,a=r||t.destination_url;_=n.href("main.store-info",{url:e.url,cc:t._id,destionationUrl:a}),$('<a href="'+_+'" target="_blank">&nbsp;</a>')[0].click(),window.location.href=a},function(e){console.log(e)})},$("#top_banner_area").hide(),t.url){var g={};g.recommended_stores=1,g.related_categories=1,g.related_stores=1;var _="/api/1.0/stores/"+t.url+"?embedded="+JSON.stringify(g)+"&number_of_clicks=1";d.get(_).then(function(t){if(console.log(t),t.data&&"object"==typeof t.data){e.store=t.data,e.store.related_stores=clearNullIds(e.store.related_stores),e.store.related_deals=clearNullIds(e.store.related_deals),e.store.toDayDate=new Date,e.store.voting=Math.floor(201*Math.random())+300;var r={meta_title:e.store.meta_title,meta_description:e.store.meta_description};f.seo({},r,""),i=JSON.stringify({related_categories:1,related_stores:1});var s={};s.recommended_stores={$in:[e.store._id]},_="/api/1.0/coupons?where="+JSON.stringify(s)+"&embedded="+i,d.get(_).then(function(t){console.log("Suggested Coupons Data: ",t.data._items),e.suggestedCoupons=t.data._items}),s={related_stores:{$in:[e.store._id]}},_="/api/1.0/coupons?where="+JSON.stringify(s)+"&max_results=1000&embedded="+i,console.log("url ------------------------------ ",_),d.get(_).then(function(t){var o=t.data._items;angular.forEach(o,function(t){angular.forEach(t.related_categories,function(t){if(null===t)return!0;e.categories[t.category_type]?a("filter")(e.categories[t.category_type],{_id:t._id}).length||e.categories[t.category_type].push(t):(e.categories[t.category_type]=[],e.categories[t.category_type].push(t))}),new Date(t.expire_date)>new Date?(t._updated=new Date(t._updated),-1===e.coupons.indexOf(t)&&(e.coupons.push(t),e.filterCoupons.push(t),e.dealsLength=a("filter")(e.filterCoupons,{coupon_type:"offer"}),e.couponsLength=a("filter")(e.filterCoupons,{coupon_type:"coupon"}))):-1===e.expiredCoupons.indexOf(t)&&e.expiredCoupons.push(t)})}),angular.forEach(e.store.related_stores,function(t){console.log("Related Stores: ",t.name,t._id),s=JSON.stringify(s={related_stores:{$in:[t._id]},expire_date:{$gte:(new Date).toGMTString()}});_="/api/1.0/coupons?where="+s+"&max_results=1&sort=[('_updated', -1)]&embedded="+i,d.get(_).then(function(t){var o=t.data._items;console.log("Related Coupons: ",o),angular.forEach(o,function(t){a("filter")(e.relatedCoupons,{_id:t._id}).length||e.relatedCoupons.push(t)})})});d.get('/api/1.0/stores?where={"featured_store": true}&max_results=10').then(function(t){console.log(t),t.data._items&&(e.store.top_stores=t.data._items)},function(e){console.log(e)});var i={};i.related_deals=1,i.deal_brands=1,i.deal_category=1,i["stores.store"]=1,where=JSON.stringify({store_temp:e.store._id,status:!0,deal_type:"store"});var l=(new Date).getDate();_="/api/1.0/deals?where="+where+"&embedded="+JSON.stringify(i)+"&rand_number="+l,o({url:_,method:"GET"}).then(function(t){t.data&&(e.deals=t.data._items)},function(e){console.log(e)}),e.store.top_banner||(e.top_banner={},where=JSON.stringify({top_banner_string:"store",expired_date:{$gte:(new Date).toGMTString()}}),_="/api/1.0/banner?where="+where,d.get(_).then(function(t){console.log("banner Details: ",t.data._items),e.top_banner=t.data._items[0],$("#top_banner_area").show()})),e.store.side_banner||(e.side_banner={},where=JSON.stringify({side_banner_string:"store",expired_date:{$gte:(new Date).toGMTString()}}),_="/api/1.0/banner?where="+where,d.get(_).then(function(t){console.log("Side banner Details: ",t.data._items),e.side_banner=t.data._items[0]}))}else n.go("404")},function(e){console.log(e)})}else n.go("main.home");t.cc&&($("coupon-info-popup").remove(),g=JSON.stringify({related_stores:1,related_categories:1}),_="/api/1.0/coupons/"+t.cc+"?number_of_clicks=1&embedded="+g+"&rand="+Math.random(),o.get(_).then(function(t){console.log("$stateParams CC Data: ",t.data),e.couponInfo=t.data;var o=c("<coupon-info-popup parent='store' type='store' coupon='couponInfo'></coupon-info-popup>")(e);$("body").append(o),setTimeout(function(){$("#couponPopup").modal("show")},1e3),console.log(o)},function(e){console.log("$stateParams CC: ",e),n.go("main.store-info",{url:t.url,cc:void 0,destionationUrl:void 0})}))}]).filter("couponFilter",function(){return function(e,t){var o=[];if(!(Object.keys(t.category).length||Object.keys(t.wallet).length||Object.keys(t.bank).length||Object.keys(t.city).length||Object.keys(t.brands).length||Object.keys(t.festivals).length))return e;var n=0;return angular.forEach(t,function(e,t){angular.forEach(e,function(e,t){1==e&&n++})}),0==n?e:(angular.forEach(e,function(e){angular.forEach(e.related_categories,function(n){angular.forEach(t,function(t,r){angular.forEach(t,function(t,r){n&&1==t&&r==n._id&&-1==o.indexOf(e)&&o.push(e)})})})}),o)}}).factory("StoreQuery",["$http","$q",function(e,t){return{postFav:function(o){var n=t.defer();return e(o).then(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},get:function(o){var n=t.defer();return e({url:o+"&r="+Math.random(),method:"GET"}).then(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]).directive("ddTextCollapse",["$compile","$sce",function(e,t){return{restrict:"A",scope:!0,link:function(t,o,n){function r(e){return e?String(e).replace(/<[^>]+>/gm,""):""}t.collapsed=!1,t.toggle=function(){t.collapsed=!t.collapsed},n.$observe("ddTextCollapseText",function(a){a=r(a);var s=t.$eval(n.ddTextCollapseMaxLength);if(a.length>s){var i=String(a).substring(0,s),l=String(a).substring(s,a.length),c=e("<span>"+i+"</span>")(t),d=e('<span ng-if="collapsed">'+l+"</span>")(t),u=e('<span ng-if="!collapsed">... </span>')(t),p=e('<br ng-if="collapsed">')(t),f=e('<span style="cursor: pointer; color: #165ba8;" class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "Show Less" : "Show More"}}</span>')(t);o.empty(),o.append(c),o.append(d),o.append(u),o.append(p),o.append(f)}else o.empty(),o.append(a)})}}}]);