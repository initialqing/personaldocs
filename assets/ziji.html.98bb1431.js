import{_ as n,o as s,c as a,d as t}from"./app.71cb111c.js";const p={},e=t(`<h1 id="\u5B50\u96C6" tabindex="-1"><a class="header-anchor" href="#\u5B50\u96C6" aria-hidden="true">#</a> \u5B50\u96C6</h1><h2 id="_78-\u5B50\u96C6" tabindex="-1"><a class="header-anchor" href="#_78-\u5B50\u96C6" aria-hidden="true">#</a> 78.\u5B50\u96C6</h2><h3 id="\u9898\u76EE\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE\u63CF\u8FF0" aria-hidden="true">#</a> \u9898\u76EE\u63CF\u8FF0</h3><p>\u7ED9\u4F60\u4E00\u4E2A\u6574\u6570\u6570\u7EC4 <code>nums</code> \uFF0C\u6570\u7EC4\u4E2D\u7684\u5143\u7D20 <strong>\u4E92\u4E0D\u76F8\u540C</strong> \u3002\u8FD4\u56DE\u8BE5\u6570\u7EC4\u6240\u6709\u53EF\u80FD\u7684\u5B50\u96C6\uFF08\u5E42\u96C6\uFF09\u3002</p><p>\u89E3\u96C6 <strong>\u4E0D\u80FD</strong> \u5305\u542B\u91CD\u590D\u7684\u5B50\u96C6\u3002\u4F60\u53EF\u4EE5\u6309 <strong>\u4EFB\u610F\u987A\u5E8F</strong> \u8FD4\u56DE\u89E3\u96C6\u3002</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>\u8F93\u5165\uFF1Anums = [1,2,3]</p><p>\u8F93\u51FA\uFF1A[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</p></div><h3 id="\u601D\u8DEF" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF" aria-hidden="true">#</a> \u601D\u8DEF</h3><p>\u540C\u4E00\u4E2A\u5B50\u96C6\u8FDB\u884C\u64CD\u4F5C\uFF0C\u9700\u8981startIndex\uFF0C\u5728\u6BCF\u4E00\u4E2A\u9012\u5F52\u5C42\u76F4\u63A5\u6536\u96C6\u7ED3\u679C\uFF0C\u56E0\u4E3A\u662F\u53D6\u7684\u5B50\u96C6\u53EF\u4EE5\u76F4\u63A5\u6536\u96C6\u7ED3\u679C\u3002</p><p>\u4E0D\u540C\u9012\u5F52\u5C42\u7684startIndex + 1\uFF0C\u5F53startIndex &gt; nums.length \u7684\u65F6\u5019\u5C31\u4E0D\u4F1A\u8FDB\u5165\u9012\u5F52\u4E86</p><h3 id="\u4EE3\u7801\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">subsets</span><span class="token punctuation">(</span>nums<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> res<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">const</span> path<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">function</span> <span class="token function">backTricking</span><span class="token punctuation">(</span>startIndex<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// \u6536\u96C6\u7ED3\u679C</span>
        res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>path<span class="token punctuation">]</span><span class="token punctuation">)</span>
		<span class="token comment">// \u9012\u5F52</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> startIndex<span class="token punctuation">;</span>i<span class="token operator">&lt;</span>nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            path<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token function">backTricking</span><span class="token punctuation">(</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span>
            path<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">backTricking</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> res
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_90-\u5B50\u96C6ii" tabindex="-1"><a class="header-anchor" href="#_90-\u5B50\u96C6ii" aria-hidden="true">#</a> 90.\u5B50\u96C6\u2161</h2><h3 id="\u9898\u76EE\u63CF\u8FF0-1" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE\u63CF\u8FF0-1" aria-hidden="true">#</a> \u9898\u76EE\u63CF\u8FF0</h3><p>\u7ED9\u4F60\u4E00\u4E2A\u6574\u6570\u6570\u7EC4 nums \uFF0C\u5176\u4E2D\u53EF\u80FD\u5305\u542B\u91CD\u590D\u5143\u7D20\uFF0C\u8BF7\u4F60\u8FD4\u56DE\u8BE5\u6570\u7EC4\u6240\u6709\u53EF\u80FD\u7684\u5B50\u96C6\uFF08\u5E42\u96C6\uFF09\u3002</p><p>\u89E3\u96C6 \u4E0D\u80FD \u5305\u542B\u91CD\u590D\u7684\u5B50\u96C6\u3002\u8FD4\u56DE\u7684\u89E3\u96C6\u4E2D\uFF0C\u5B50\u96C6\u53EF\u4EE5\u6309 \u4EFB\u610F\u987A\u5E8F \u6392\u5217\u3002</p><div class="custom-container tip"><p class="custom-container-title">\u793A\u4F8B</p><p>\u8F93\u5165\uFF1Anums = [1,2,2]</p><p>\u8F93\u51FA\uFF1A[[],[1],[1,2],[1,2,2],[2],[2,2]]</p></div><h3 id="\u601D\u8DEF-1" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF-1" aria-hidden="true">#</a> \u601D\u8DEF</h3><p>\u4E0E\u5B50\u96C6\u4E0D\u540C\u7684\u60C5\u51B5\u662F\u9700\u8981\u53BB\u91CD\uFF0C\u53BB\u91CD\u7684\u65B9\u6CD5\u53EF\u4EE5\u53C2\u8003\u7EC4\u5408\u95EE\u9898\u3002</p><p>\u4E0E\u6392\u5217\u95EE\u9898\u53BB\u91CD\u65B9\u5F0F\u4E0D\u540C\u7684\u539F\u56E0\u662F\u8FD9\u4E2A\u9898\u76EE\u53EF\u4EE5\u4E0D\u4F7F\u7528used\u7684\u65B9\u5F0F\u53BB\u91CD\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528set\u96C6\u5408\u53BB\u91CD\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528 <code>i &gt; startIndex &amp;&amp; nums[i] === nums[i-1]</code>\u3002\u4E09\u79CD\u53BB\u91CD\u7684\u65B9\u5F0F</p><h3 id="\u4EE3\u7801\u5B9E\u73B0-1" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0-1" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">subsetsWithDup</span><span class="token punctuation">(</span>nums<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> result<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> path<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// \u53BB\u91CD\u4E4B\u524D\u5148\u6392\u5E8F</span>
    nums<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a <span class="token operator">-</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">backTracking</span><span class="token punctuation">(</span>startIndex<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6536\u96C6\u7ED3\u679C</span>
        result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>path<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token comment">// \u6B64\u5904\u4E0D\u8FD4\u56DE\u4E5F\u53EF\u4EE5\u56E0\u4E3A\uFF0C\u6BCF\u6B21\u9012\u5F52\u90FD\u4F1A\u4F7FstartIndex + 1\uFF0C\u5F53\u8FD9\u4E2A\u6570\u5927\u5230nums.length\u7684\u65F6\u5019\u5C31\u4E0D\u4F1A\u8FDB\u5165\u9012\u5F52\u4E86\u3002</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>startIndex <span class="token operator">===</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u5B9A\u4E49\u6BCF\u4E00\u4E2A\u6811\u5C42\u7684set\u96C6\u5408</span>
        <span class="token keyword">const</span> set<span class="token operator">:</span> Set<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> startIndex<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// \u53BB\u91CD</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">continue</span>
            <span class="token punctuation">}</span>
            set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
            path<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token function">backTracking</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token comment">// \u56DE\u6EAF</span>
            path<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">backTracking</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> result
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),o=[e];function c(i,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","ziji.html.vue"]]);export{r as default};
