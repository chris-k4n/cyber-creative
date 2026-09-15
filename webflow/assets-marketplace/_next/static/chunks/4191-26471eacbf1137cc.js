"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4191],{97855:(e,t,r)=>{r.d(t,{o:()=>f});var i=r(406029);r(455729);var o=r(795669),a=r.n(o),s=r(506772),n=r.n(s),m=r(681805),c=r(781101),u=r.n(c);let d=`
  function getFirstTouchCookie(firstTouchCookieKey) {
    if (!firstTouchCookieKey) return;
    return document.cookie.split(';').find(function(item) {
      return item.trim().indexOf(firstTouchCookieKey + '=') === 0;
    });
  }

  function setFirstTouchCookie(firstTouchCookieKey, firstTouchParams) {
    var expireDate = new Date();
    var domain = window.location.hostname.toString();

    expireDate.setTime(expireDate.getTime() + (365 * 24 * 60 * 60 * 1000));

    document.cookie = [
      firstTouchCookieKey,
      '=',
      encodeURIComponent(JSON.stringify(firstTouchParams)),
      ';secure',
      ';domain=.',
      domain,
      ';path=/',
      ';expires=',
      expireDate.toUTCString(),
    ].join('');
  }

  function parseFirstTouchParams(firstTouchCookieKey, firstTouchCookie) {
    try {
      return JSON.parse(decodeURIComponent(firstTouchCookie).trim().substring(firstTouchCookieKey.length + 1, firstTouchCookie.length))
    } catch (e) {
      console.log(e);
    }
  }

  // We apply a limit on a presignup breadcrumbs entry in order to not allow cookie to grow too big
  // (above 4000 bytes, which was a max size of cookies allowed by our infrastructure
  // when the issue was reported).
  //
  // A sophisticated approach could be to check length of a whole cookie and, if too big in bytes,
  // decide what data to remove from the cookie. But we decided to take a simplified one:
  // we know that "presignup_breadcrumbs" is so far the only first touch cookie's field which
  // grows a lot over time (adding a URL to an array potentially on every page visit), therefore
  // we can focus on that field only. Next, we do not count real bytes in a serialized cookie,
  // but string chars (they could differ for example for emojis, but we do not expect emojis in URLs).
  // Moreover, we ignore bytes added between array entries in a serialized JSON (double quotes, commas,
  // spaces). Instead, we limit URLs to arbitrarily chosen:
  // - max 10 URLs
  // - max 1000 characters (sum of those URLs)
  //
  function limitPresignupBreadcrumbs(breadcrumbs) {
    var urlsLimit = 10;
    var charsLimit = 1000;

    var limitedBreadcrumbs = [];

    var charsTotal = 0;
    for (let i = breadcrumbs.length - 1; i >= 0; i--) {
      if (limitedBreadcrumbs.length < urlsLimit) {
        charsTotal += breadcrumbs[i].length;
        if (charsTotal <= charsLimit) {
          limitedBreadcrumbs.push(breadcrumbs[i]);
        }
      }
    }
    limitedBreadcrumbs.reverse();
    return limitedBreadcrumbs;
  }
`;var h=r(759879),l=r(613767);let f=e=>{let{title:t="Design Responsive Websites",description:r="Webflow is the top drag-and-drop website builder for creating professional responsive websites.",noindex:o=!1,canonicalUrl:s,enableSocialMetaTags:c=!1,socialMetaTags:f={},swiftypeMetaTags:p={},enableSwiftypeMetaTags:g=!1,titleSuffix:b=" - Webflow"}=e,{twitterTitle:T="Build professional websites visually with Webflow",twitterDescription:y="Join over 500,000 designers building professional, responsive websites in Webflow. It is free to use and simple to start.",twitterImage:w=m.vF.image,ogTitle:k="Design Professional Websites Visually",ogDescription:_="See why over 500,000 professional designers, marketers, and businesses have chosen Webflow to create and host their Website.",ogSiteName:x="Webflow",ogUrl:v=m.Ps,ogImage:P=m.vF.image}=f,{user:C}=(0,h.w)(),{tags:F=[],webflow_id:E,image:A,number_of_likes:j,is_cloneable:I}=p,S=e=>g?{className:"swiftype","data-type":e}:{};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(a(),{children:[(0,i.jsx)("title",{children:`${t}${b}`}),(0,i.jsx)("meta",{name:"title",content:t,...S("string")}),(0,i.jsx)("meta",{name:"description",content:r,...S("string")}),s&&(0,i.jsx)("link",{rel:"canonical",href:s}),o&&(0,i.jsx)("meta",{name:"robots",content:"noindex, follow"}),c&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("meta",{name:"twitter:card",content:m.vF.twitterCard}),(0,i.jsx)("meta",{name:"twitter:site",content:m.vF.twitterSite}),(0,i.jsx)("meta",{name:"twitter:creator",content:m.vF.twitterCreator}),(0,i.jsx)("meta",{name:"twitter:title",content:T}),(0,i.jsx)("meta",{name:"twitter:description",content:y}),(0,i.jsx)("meta",{name:"twitter:image",content:w}),(0,i.jsx)("meta",{property:"og:type",content:m.vF.ogType}),(0,i.jsx)("meta",{property:"og:title",content:k}),(0,i.jsx)("meta",{property:"og:description",content:_}),(0,i.jsx)("meta",{property:"og:site_name",content:x}),(0,i.jsx)("meta",{property:"og:url",content:v}),(0,i.jsx)("meta",{name:"image",property:"og:image",content:P}),(0,i.jsx)("meta",{name:"fb:app_id",content:m.vF.fbAppId})]}),g&&(0,i.jsxs)(i.Fragment,{children:[E?(0,i.jsx)("meta",{name:"webflow_id",content:E,...S("string")}):null,A?(0,i.jsx)("meta",{name:"image",content:A,...S("string")}):null,F?.filter(e=>!!e).map(e=>(0,i.jsx)("meta",{name:"tags",content:e,...S("string")},e)),(0,i.jsx)("meta",{name:"number_of_likes",content:String(j??0),...S("integer")}),(0,i.jsx)("meta",{name:"is_cloneable",content:`${I??!1}`,...S("enum")})]})]}),(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(n(),{id:"first-touch-cookie",type:"text/javascript",strategy:"afterInteractive",dangerouslySetInnerHTML:{__html:(e=>`
(function() {
`+d+(e?`
    var a_uid='${e._id}';

    // Here we define user properties that are easier to define on the
    // client side
    var _user_meta = {
        'last open marketplace': new Date()
    };

    analytics.identify(a_uid, _user_meta);

    (function limitSizeOfPreviouslyCreatedFirstTouchCookie() {
      var firstTouchCookieKey = '${u().FIRST_TOUCH_COOKIE}';
      var firstTouchCookie = getFirstTouchCookie(firstTouchCookieKey);
      if (!firstTouchCookie) return;

      var firstTouchParams = parseFirstTouchParams(firstTouchCookieKey, firstTouchCookie);
      if (!firstTouchParams) return;

      if (firstTouchParams.presignup_breadcrumbs) {
        firstTouchParams.presignup_breadcrumbs = limitPresignupBreadcrumbs(firstTouchParams.presignup_breadcrumbs);
        setFirstTouchCookie(firstTouchCookieKey, firstTouchParams);
      }
    })();
`:`
    function getQueryParam (param) {
      var query = window.location.search.substring(1);
      var params = query.split('&');
      for (var i = 0; i < params.length; i++) {
        var pair = params[i].split('=');
        if (decodeURIComponent(pair[0]) === param) {
          return decodeURIComponent(pair[1]);
        }
      }
      return null;
    }

    function getURLDomainName (url) {
      var a = document.createElement('a');
      a.href = url;
      return a.hostname;
    }

    function getBreadcrumb() {
      var match = 'utm_';
      var hasUtm = window.location.search.substr(1).split('&').some(function(query) {
        var chunks = query.split('=');
        var key = chunks[0];
        return key.startsWith(match);
      });

      return (hasUtm) ?
        window.location.host +
        window.location.pathname +
        window.location.search +
        window.location.hash :
        '';
    }

    function handleFirstTouchParams(firstTouchCookieKey, gatherFirstTouchParamsFn, updateBreadcrumbInFirstTouchParamsFn) {
      var firstTouchCookie = getFirstTouchCookie(firstTouchCookieKey);
      var breadcrumb = getBreadcrumb();

      if (!firstTouchCookie) {
        var firstTouchParams = gatherFirstTouchParamsFn(breadcrumb);
        setFirstTouchCookie(firstTouchCookieKey, firstTouchParams);
      } else if (breadcrumb) {
        var firstTouchParams = parseFirstTouchParams(firstTouchCookieKey, firstTouchCookie);
        if (!firstTouchParams) return;
        updateBreadcrumbInFirstTouchParamsFn(firstTouchParams, breadcrumb);
        setFirstTouchCookie(firstTouchCookieKey, firstTouchParams);
      }
    }

    if (window.self !== window.top) {
      // If this is loaded in an iframe, skip setting the first touch cookie.
      // We load the dashboard sign up page in an iframe (within a modal) on marketing pages
      // and the iframe has the incorrect first touch parameters.
      // Therefore, we'll let the marketing page itself set the cookie and skip setting it here.
      return;
    }

    handleFirstTouchParams(
      '${u().FIRST_TOUCH_COOKIE}',
      function gatherFirstTouchParams(breadcrumb) {
        var firstTouchParams = {
          first_touch_date: new Date().toISOString(),
          initial_utm_campaign: getQueryParam('utm_campaign'),
          initial_utm_content: getQueryParam('utm_content'),
          initial_utm_medium: getQueryParam('utm_medium'),
          initial_utm_source: getQueryParam('utm_source'),
          initial_utm_term: getQueryParam('utm_term'),
          initial_gclid: getQueryParam('gclid'),
          initial_page_url: document.location.href,
        };
        if (document.referrer) {
          firstTouchParams['initial_referrer'] = document.referrer;
          firstTouchParams['initial_referring_domain'] = getURLDomainName(document.referrer);
        }
        if (breadcrumb) {
          firstTouchParams.presignup_breadcrumbs = limitPresignupBreadcrumbs([breadcrumb]);
        }
        return firstTouchParams;
      },
      function updateBreadcrumbInFirstTouchParams(firstTouchParams, breadcrumb) {
        if (!firstTouchParams.presignup_breadcrumbs) {
          firstTouchParams.presignup_breadcrumbs = [];
        }
        firstTouchParams.presignup_breadcrumbs.push(breadcrumb);
        firstTouchParams.presignup_breadcrumbs = limitPresignupBreadcrumbs(firstTouchParams.presignup_breadcrumbs);
      }
    );
`)+`
  })();
`)(C)},onError:e=>{console.error("Script failed to load",e),l.A.error("ANALYTICS_SCRIPT Failed to Load",void 0,e)}})})]})}},119483:(e,t,r)=>{r.d(t,{nk:()=>i}),r(51222),r(3974),r(681805),r(613767);let i="X-XSRF-Token"},272438:(e,t,r)=>{r.d(t,{s:()=>n});var i=r(368199),o=r(951033),a=r(663044);let s=[a.ANALYTICS_EVENTS.SHOWCASE_VIEWED,a.ANALYTICS_EVENTS.MARKETPLACE_VIEWED,a.ANALYTICS_EVENTS.HIRE_PAGE_VIEWED],n=(e,t)=>{s.includes(e)&&(0,i.getFeatureFlagOutsideOfReact)(o.FEATURE_FLAGS.DISABLE_MARKETPLACE_HIGH_TRAFFIC_EVENTS)||window.analytics?.track(e,t)}},437626:(e,t,r)=>{r.d(t,{Ay:()=>u,ip:()=>d,xV:()=>h});var i=r(447333),o=r.n(i),a=r(681805),s=r(613767),n=r(742725),m=r(119483);let c=function(){let{headers:e={},method:t="GET",body:r,...i}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{credentials:"include",body:JSON.stringify(r),method:t,headers:{Accept:"application/json","Content-Type":"application/json",...e},...i}},u=(()=>{let e=async function(e){let t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};r.method||(r.method="GET");let i=a.di,n=c(r);l(e,n);let m=encodeURI(e).replace(/\+/g,"%2B"),u=await o()(((e,t)=>{let r=e.endsWith("/")?e.substring(0,e.length-1):e;return`${r}${t}`})(r.baseUrl||i,m),n).catch(t=>{throw g(e,n,t),t});f(e,n,u);try{t=u?.status===204?"":await u.json()}catch(e){s.A.debug(`API Response - unable to parse response body due to: ${JSON.stringify(e)}`)}if(!u.ok){let r=t?.message||t?.msg;401!==u.status&&p(e,n,u,r);let i="We’re sorry, an error occurred. Refresh the page or contact us.",o=Error(r||i);throw o.name=t?.name,o.status=u.status,o.statusText=u.statusText||i,o}return t};return{request:e,get:(t,r)=>e(t,r),post:function(t,r){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e(t,{...i,body:r,method:"POST"})},patch:function(t,r){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e(t,{...i,body:r,method:"PATCH"})},put:function(t,r){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e(t,{...i,body:r,method:"PUT"})},delete:function(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e(t,{...r,method:"DELETE"})}}})(),d=e=>({headers:{Cookie:e.cookies,[m.nk]:e.csrfToken}}),h=(e,t)=>({headers:{Cookie:e,...t&&{"x-forwarded-for":t}}}),l=(e,t)=>{s.A.debug(`API Request: ${t.method} ${e} headers.host: ${t.headers.host}`)},f=(e,t,r)=>{s.A.debug(`API Response: ${t.method} ${e} - ${r.status} ${r.statusText}`)},p=(e,t,r,i)=>{let o=r?`${r.status} ${r.statusText}`:"",a=i?`caused by [${i}]`:"";s.A.error("API Response Error",{method:t.method,endpoint:e,responseDetails:o,causedBy:a})},g=(e,t,r)=>{let i=r.message?`caused by [${r.message}]`:"";s.A.error("API Error",{method:t.method,endpoint:e,causedBy:i},r)}},894439:(e,t,r)=>{r.d(t,{A:()=>n});var i=r(733612),o=r.n(i),a=r(443855);let s="#000000",n={foreground:{black8:o()(s).setAlpha(.8).toString(),black5:a.tokens.colors.textSecondary,black16:o()(s).setAlpha(.16).toString()},colors:{grey:{10:"#F6F6F6",20:"#F1F1F1",30:"#D6D6D6",40:"#BDBDBD",50:"#808080",60:"#333333"},white:"#ffffff",black:"#000000",blue:{medium:"#323ED1",light:"#738CFF",faint:"#F1F4FF"},indigo:{medium:"#4F46E5",light:"#3545EE"},green:{medium:"#059669",light:"#10B981"}},borderWidth:{1:"1px",2:"2px",4:"4px",8:"8px"},borderRadius:{sm:"0.125rem",md:"0.188rem",xl:"0.8125rem"},lineHeights:{base:1.5},fontSizes:{caption:"12px",body:"14px",bodyLarge:"16px",subheading:"20px",heading:"24px",title:"32px"},fontWeights:{light:300,normal:400,medium:500,semibold:600,bold:700},breakpoints:{xl:"1280px",md:"768px"},spacing:{px:"1px",0:"0",.5:"0.125rem",1:"0.25rem",1.5:"0.375rem",2:"0.5rem",2.5:"0.625rem",3:"0.75rem",3.5:"0.875rem",4:"1rem",4.5:"1.125rem",5:"1.25rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem",11:"2.75rem",12:"3rem",14:"3.5rem",16:"4rem",17:"4.375rem",18:"4.5rem",20:"5rem",24:"6rem",28:"7rem",30:"7.5rem",32:"8rem",36:"9rem",40:"10rem",44:"11rem",48:"12rem",52:"13rem",56:"14rem",60:"15rem",64:"16rem",72:"18rem",80:"20rem",96:"24rem"}}}}]);