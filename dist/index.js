import{h as e}from"hyperapp";const t=e=>" "==e||"\t"==e||"\n"==e||"\r"==e,l=(r,n,f,o)=>{let s,i,p,h,c,u,a="",g=[],m=0;const d=t=>{g.push(i.call?i(h,t):e(i,h,t)),m=0},x=e=>{e&&(a=a.trimEnd()),a&&(g.push(a),a="")},y=()=>{let e=l(r,n,c,u+1);d(e[0]),c=e[1],u=e[2]},E=(e=m)=>{i=a,h={},m=e},b=()=>{n[c]&&(g=g.concat(n[c]))},j=(e=m)=>{h[a]=!0,m=e},k=e=>{h[p]=e,m=5};for(c=f;c<r.length;c++){for(u=o;u<r[c].length;u++)if(s=r[c][u],0==m)"<"==s?m=2:t(s)||(m=1,a=s);else if(1==m)"<"==s?(x(!0),m=2):a+=s;else if(2==m)"/"==s?m=3:(m=4,a=s);else if(3==m){if(">"==s)return[g,c,u]}else 4==m?t(s)?E(5):"/"==s?E(6):">"==s?(E(),y()):a+=s:6==m?">"==s&&d([]):5==m?"."==s||("/"==s?m=6:">"==s?y():t(s)||(a=s,m=7)):7==m?"="==s?(p=a,m=8):">"==s?(j(),y()):"/"==s?j(6):t(s)?j(5):a+=s:8==m?'"'==s&&(m=9,a=""):9==m&&('"'==s?k(a):a+=s);o=0,2==m?(i=n[c],h={},m=5):1==m?(x(!n[c]),b()):5==m?h={...h,...n[c]}:8==m?k(n[c]):9==m?a+=n[c]:0==m&&b()}return[1==g.length?g[0]:g,c,u]};export default(e,...t)=>l(e,t,0,0)[0];
