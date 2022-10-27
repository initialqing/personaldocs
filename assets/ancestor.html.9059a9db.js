import{_ as o,r as e,o as l,c,a as n,e as a,w as t,b as p,d as r}from"./app.71cb111c.js";const i={},u={class:"table-of-contents"},k=r(`<h2 id="_235-\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148" tabindex="-1"><a class="header-anchor" href="#_235-\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148" aria-hidden="true">#</a> 235.\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148</h2><h3 id="\u9898\u76EE\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE\u63CF\u8FF0" aria-hidden="true">#</a> \u9898\u76EE\u63CF\u8FF0</h3><p>\u7ED9\u5B9A\u4E00\u4E2A\u4E8C\u53C9\u641C\u7D22\u6811, \u627E\u5230\u8BE5\u6811\u4E2D\u4E24\u4E2A\u6307\u5B9A\u8282\u70B9\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148\u3002</p><p><strong>\u767E\u5EA6\u767E\u79D1</strong>\u4E2D\u6700\u8FD1\u516C\u5171\u7956\u5148\u7684\u5B9A\u4E49\u4E3A\uFF1A\u201C\u5BF9\u4E8E\u6709\u6839\u6811 T \u7684\u4E24\u4E2A\u7ED3\u70B9 p\u3001q\uFF0C\u6700\u8FD1\u516C\u5171\u7956\u5148\u8868\u793A\u4E3A\u4E00\u4E2A\u7ED3\u70B9 x\uFF0C\u6EE1\u8DB3 x \u662F p\u3001q \u7684\u7956\u5148\u4E14 x \u7684\u6DF1\u5EA6\u5C3D\u53EF\u80FD\u5927\uFF08\u4E00\u4E2A\u8282\u70B9\u4E5F\u53EF\u4EE5\u662F\u5B83\u81EA\u5DF1\u7684\u7956\u5148\uFF09\u3002\u201D</p><div class="custom-container tip"><p class="custom-container-title">\u793A\u4F8B</p><p>\u8F93\u5165: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8</p><p>\u8F93\u51FA: 6</p><p>\u89E3\u91CA: \u8282\u70B9 2 \u548C\u8282\u70B9 8 \u7684\u6700\u8FD1\u516C\u5171\u7956\u5148\u662F 6\u3002</p></div><p><img src="https://example.qingcc.top/image-20220927205536496.png" alt="image-20220927205536496"></p><h3 id="\u601D\u8DEF" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF" aria-hidden="true">#</a> \u601D\u8DEF</h3><p>\u56E0\u4E3A\u662F\u4E8C\u53C9\u641C\u7D22\u6811\uFF0C\u4E8C\u53C9\u641C\u7D22\u6811\u6709\u5E8F\uFF0Cp\u3001q\u8282\u70B9\u5206\u522B\u5728\u8FD9\u4E2Aroot\u8282\u70B9\u7684\u5DE6\u53F3\u4E24\u8FB9\uFF0C\u90A3\u4E48root\u8282\u70B9\u4E00\u5B9A\u662F\u8FD9pq\u8FD9\u4E24\u4E2A\u8282\u70B9\u7684\u516C\u5171\u7956\u5148\u3002</p><h3 id="\u4EE3\u7801\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>
<span class="token keyword">function</span> <span class="token function">lowestCommonAncestor</span><span class="token punctuation">(</span>root<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span> p<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span> q<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token comment">// p\u3001q\u8282\u70B9root\u8282\u70B9\u7684\u540C\u4E00\u8FB9</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&lt;</span> p<span class="token punctuation">.</span>val <span class="token operator">&amp;&amp;</span> root<span class="token punctuation">.</span>val <span class="token operator">&lt;</span> q<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">lowestCommonAncestor</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> p<span class="token punctuation">,</span> q<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&gt;</span> p<span class="token punctuation">.</span>val <span class="token operator">&amp;&amp;</span> root<span class="token punctuation">.</span>val <span class="token operator">&gt;</span> q<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">lowestCommonAncestor</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> p<span class="token punctuation">,</span> q<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// p\u3001q\u8282\u70B9\u5728root\u8282\u70B9\u7684\u4E24\u8FB9\uFF0C\u8FD9\u4E2A\u8282\u70B9\u5C31\u662F\u516C\u5171\u7956\u5148\u8282\u70B9\u3002</span>
    <span class="token keyword">return</span> root
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_236-\u4E8C\u53C9\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148" tabindex="-1"><a class="header-anchor" href="#_236-\u4E8C\u53C9\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148" aria-hidden="true">#</a> 236.\u4E8C\u53C9\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148</h2><h3 id="\u9898\u76EE\u63CF\u8FF0-1" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE\u63CF\u8FF0-1" aria-hidden="true">#</a> \u9898\u76EE\u63CF\u8FF0</h3><p>\u7ED9\u5B9A\u4E00\u4E2A\u4E8C\u53C9\u6811, \u627E\u5230\u8BE5\u6811\u4E2D\u4E24\u4E2A\u6307\u5B9A\u8282\u70B9\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148\u3002</p><p><strong>\u767E\u5EA6\u767E\u79D1</strong>\u4E2D\u6700\u8FD1\u516C\u5171\u7956\u5148\u7684\u5B9A\u4E49\u4E3A\uFF1A\u201C\u5BF9\u4E8E\u6709\u6839\u6811 T \u7684\u4E24\u4E2A\u8282\u70B9 p\u3001q\uFF0C\u6700\u8FD1\u516C\u5171\u7956\u5148\u8868\u793A\u4E3A\u4E00\u4E2A\u8282\u70B9 x\uFF0C\u6EE1\u8DB3 x \u662F p\u3001q \u7684\u7956\u5148\u4E14 x \u7684\u6DF1\u5EA6\u5C3D\u53EF\u80FD\u5927\uFF08\u4E00\u4E2A\u8282\u70B9\u4E5F\u53EF\u4EE5\u662F\u5B83\u81EA\u5DF1\u7684\u7956\u5148\uFF09\u3002\u201D</p><div class="custom-container tip"><p class="custom-container-title">\u793A\u4F8B</p><p>\u8F93\u5165\uFF1Aroot = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1</p><p>\u8F93\u51FA\uFF1A3</p><p>\u89E3\u91CA\uFF1A\u8282\u70B9 5 \u548C\u8282\u70B9 1 \u7684\u6700\u8FD1\u516C\u5171\u7956\u5148\u662F\u8282\u70B9 3 \u3002</p></div><p><img src="https://example.qingcc.top/image-20220927210913714.png" alt="image-20220927210913714"></p><h3 id="\u601D\u8DEF-1" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF-1" aria-hidden="true">#</a> \u601D\u8DEF</h3><p>\u540E\u7EED\u904D\u5386\uFF0C\u5355\u5C42\u903B\u8F91\u4E3A\uFF0C\u770B\u8FD9\u4E2A\u8282\u70B9\u7684\u5DE6\u8FB9\u8282\u70B9\u3001\u53F3\u8FB9\u8282\u70B9\u662F\u5426\u67E5\u627E\u5230pq\u4E2D\u7684\u4EFB\u610F\u4E00\u4E2A\uFF0C\u52A0\u5165\u67E5\u5230\u4E86\u4EFB\u610F\u4E00\u4E2A\u5C31\u8FD4\u56DE\uFF0C\u6CA1\u6709\u7684\u8BDD\u5C31\u8FD4\u56DEnull\uFF0C\u5047\u5982\u4E24\u8FB9\u90FD\u6709\u8FD4\u56DE\u503C\u7684\u8BDD\uFF0C\u8BF4\u660E\u5F53\u524D\u7684\u8FD9\u4E00\u5C42\u7684\u8282\u70B9\u5C31\u662Fpq\u4E24\u4E2A\u8282\u70B9\u7684\u516C\u5171\u7956\u5148\u3002</p><h3 id="\u4EE3\u7801\u5B9E\u73B0-1" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0-1" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>
<span class="token keyword">function</span> <span class="token function">lowestCommonAncestor</span><span class="token punctuation">(</span>root<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span> p<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span> q<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">===</span> p<span class="token punctuation">.</span>val <span class="token operator">||</span> root<span class="token punctuation">.</span>val <span class="token operator">===</span> q<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token keyword">return</span> root
    <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token function">lowestCommonAncestor</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> p<span class="token punctuation">,</span> q<span class="token punctuation">)</span> <span class="token comment">// \u5DE6</span>
    <span class="token keyword">let</span> right <span class="token operator">=</span> <span class="token function">lowestCommonAncestor</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> p<span class="token punctuation">,</span> q<span class="token punctuation">)</span><span class="token comment">// \u53F3</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>left <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>right<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>left<span class="token punctuation">)</span> <span class="token keyword">return</span> right <span class="token comment">// \u4E2D</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>right<span class="token punctuation">)</span> <span class="token keyword">return</span> left 
    <span class="token keyword">if</span><span class="token punctuation">(</span>left <span class="token operator">&amp;&amp;</span> right<span class="token punctuation">)</span> <span class="token keyword">return</span> root
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20);function d(m,v){const s=e("router-link");return l(),c("div",null,[n("nav",u,[n("ul",null,[n("li",null,[a(s,{to:"#_235-\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148"},{default:t(()=>[p("235.\u4E8C\u53C9\u641C\u7D22\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#\u9898\u76EE\u63CF\u8FF0"},{default:t(()=>[p("\u9898\u76EE\u63CF\u8FF0")]),_:1})]),n("li",null,[a(s,{to:"#\u601D\u8DEF"},{default:t(()=>[p("\u601D\u8DEF")]),_:1})]),n("li",null,[a(s,{to:"#\u4EE3\u7801\u5B9E\u73B0"},{default:t(()=>[p("\u4EE3\u7801\u5B9E\u73B0")]),_:1})])])]),n("li",null,[a(s,{to:"#_236-\u4E8C\u53C9\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148"},{default:t(()=>[p("236.\u4E8C\u53C9\u6811\u7684\u6700\u8FD1\u516C\u5171\u7956\u5148")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#\u9898\u76EE\u63CF\u8FF0-1"},{default:t(()=>[p("\u9898\u76EE\u63CF\u8FF0")]),_:1})]),n("li",null,[a(s,{to:"#\u601D\u8DEF-1"},{default:t(()=>[p("\u601D\u8DEF")]),_:1})]),n("li",null,[a(s,{to:"#\u4EE3\u7801\u5B9E\u73B0-1"},{default:t(()=>[p("\u4EE3\u7801\u5B9E\u73B0")]),_:1})])])])])]),k])}const f=o(i,[["render",d],["__file","ancestor.html.vue"]]);export{f as default};