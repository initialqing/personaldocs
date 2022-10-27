import{_ as e,r as o,o as c,c as l,a as n,e as a,w as t,b as p,d as i}from"./app.71cb111c.js";const u={},r={class:"table-of-contents"},d=i(`<h2 id="_226-\u53CD\u8F6C\u4E8C\u53C9\u6811" tabindex="-1"><a class="header-anchor" href="#_226-\u53CD\u8F6C\u4E8C\u53C9\u6811" aria-hidden="true">#</a> 226.\u53CD\u8F6C\u4E8C\u53C9\u6811</h2><h3 id="\u9898\u76EE\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE\u63CF\u8FF0" aria-hidden="true">#</a> \u9898\u76EE\u63CF\u8FF0</h3><p>\u7ED9\u4F60\u4E00\u68F5\u4E8C\u53C9\u6811\u7684\u6839\u8282\u70B9 <code>root</code> \uFF0C\u7FFB\u8F6C\u8FD9\u68F5\u4E8C\u53C9\u6811\uFF0C\u5E76\u8FD4\u56DE\u5176\u6839\u8282\u70B9\u3002</p><div class="custom-container tip"><p class="custom-container-title">\u793A\u4F8B</p><p>\u8F93\u5165\uFF1Aroot = [4,2,7,1,3,6,9]</p><p>\u8F93\u51FA\uFF1A[4,7,2,9,6,3,1]</p></div><p><img src="https://example.qingcc.top/image-20220927214930789.png" alt="image-20220927214930789"></p><h3 id="\u601D\u8DEF" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF" aria-hidden="true">#</a> \u601D\u8DEF</h3><p>\u4E2D\u5E8F\u904D\u5386\uFF0C\u53EF\u4EE5\u5148\u53CD\u8F6C\u5F53\u524D\u8282\u70B9\u7684\u5DE6\u53F3\u4E24\u4E2A\u8282\u70B9\uFF0C\u7136\u540E\u518D\u5206\u522B\u5411\u5DE6\u53F3\u9012\u5F52\u53CD\u8F6C\uFF0C\u9700\u8981\u6CE8\u610F\u7684\u662F\u5F53\u8F93\u5165\u4E3A\u7A7A\u8282\u70B9\u7684\u65F6\u5019\u76F4\u63A5\u8FD4\u56DEnull\u3002</p><h3 id="\u4EE3\u7801\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">invertTree</span><span class="token punctuation">(</span>root<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">.</span>left <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token keyword">return</span> root
    <span class="token keyword">const</span> temp <span class="token operator">=</span> root<span class="token punctuation">.</span>left <span class="token comment">// \u4E2D\u7684\u903B\u8F91</span>
    root<span class="token punctuation">.</span>left <span class="token operator">=</span> root<span class="token punctuation">.</span>right
    root<span class="token punctuation">.</span>right <span class="token operator">=</span> temp
    <span class="token function">invertTree</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span> <span class="token comment">// \u5DE6</span>
    <span class="token function">invertTree</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token comment">// \u53F3</span>
    <span class="token keyword">return</span> root
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_654-\u6700\u5927\u4E8C\u53C9\u6811" tabindex="-1"><a class="header-anchor" href="#_654-\u6700\u5927\u4E8C\u53C9\u6811" aria-hidden="true">#</a> 654.\u6700\u5927\u4E8C\u53C9\u6811</h2><h3 id="\u9898\u76EE\u63CF\u8FF0-1" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE\u63CF\u8FF0-1" aria-hidden="true">#</a> \u9898\u76EE\u63CF\u8FF0</h3><p>\u7ED9\u5B9A\u4E00\u4E2A\u4E0D\u91CD\u590D\u7684\u6574\u6570\u6570\u7EC4 <code>nums</code> \u3002 \u6700\u5927\u4E8C\u53C9\u6811 \u53EF\u4EE5\u7528\u4E0B\u9762\u7684\u7B97\u6CD5\u4ECE nums \u9012\u5F52\u5730\u6784\u5EFA:</p><ol><li><p>\u521B\u5EFA\u4E00\u4E2A\u6839\u8282\u70B9\uFF0C\u5176\u503C\u4E3A <code>nums</code> \u4E2D\u7684\u6700\u5927\u503C\u3002</p></li><li><p>\u9012\u5F52\u5730\u5728\u6700\u5927\u503C \u5DE6\u8FB9 \u7684 \u5B50\u6570\u7EC4\u524D\u7F00\u4E0A \u6784\u5EFA\u5DE6\u5B50\u6811\u3002</p></li><li><p>\u9012\u5F52\u5730\u5728\u6700\u5927\u503C \u53F3\u8FB9 \u7684 \u5B50\u6570\u7EC4\u540E\u7F00\u4E0A \u6784\u5EFA\u53F3\u5B50\u6811\u3002</p></li></ol><p>\u8FD4\u56DE <code>nums</code> \u6784\u5EFA\u7684 \u6700\u5927\u4E8C\u53C9\u6811 \u3002</p><div class="custom-container tip"><p class="custom-container-title">\u793A\u4F8B</p><p>\u8F93\u5165\uFF1Anums = [3,2,1,6,0,5]</p><p>\u8F93\u51FA\uFF1A[6,3,5,null,2,0,null,null,1]</p></div><p>\u89E3\u91CA\uFF1A\u9012\u5F52\u8C03\u7528\u5982\u4E0B\u6240\u793A\uFF1A</p><ul><li>[3,2,1,6,0,5] \u4E2D\u7684\u6700\u5927\u503C\u662F 6 \uFF0C\u5DE6\u8FB9\u90E8\u5206\u662F [3,2,1] \uFF0C\u53F3\u8FB9\u90E8\u5206\u662F [0,5] \u3002 <ul><li>[3,2,1] \u4E2D\u7684\u6700\u5927\u503C\u662F 3 \uFF0C\u5DE6\u8FB9\u90E8\u5206\u662F [] \uFF0C\u53F3\u8FB9\u90E8\u5206\u662F [2,1] \u3002 <ul><li>\u7A7A\u6570\u7EC4\uFF0C\u65E0\u5B50\u8282\u70B9\u3002</li><li>[2,1] \u4E2D\u7684\u6700\u5927\u503C\u662F 2 \uFF0C\u5DE6\u8FB9\u90E8\u5206\u662F [] \uFF0C\u53F3\u8FB9\u90E8\u5206\u662F [1] \u3002 <ul><li>\u7A7A\u6570\u7EC4\uFF0C\u65E0\u5B50\u8282\u70B9\u3002</li><li>\u53EA\u6709\u4E00\u4E2A\u5143\u7D20\uFF0C\u6240\u4EE5\u5B50\u8282\u70B9\u662F\u4E00\u4E2A\u503C\u4E3A 1 \u7684\u8282\u70B9\u3002</li></ul></li></ul></li><li>[0,5] \u4E2D\u7684\u6700\u5927\u503C\u662F 5 \uFF0C\u5DE6\u8FB9\u90E8\u5206\u662F [0] \uFF0C\u53F3\u8FB9\u90E8\u5206\u662F [] \u3002 <ul><li>\u53EA\u6709\u4E00\u4E2A\u5143\u7D20\uFF0C\u6240\u4EE5\u5B50\u8282\u70B9\u662F\u4E00\u4E2A\u503C\u4E3A 0 \u7684\u8282\u70B9\u3002</li><li>\u7A7A\u6570\u7EC4\uFF0C\u65E0\u5B50\u8282\u70B9\u3002</li></ul></li></ul></li></ul><p><img src="https://example.qingcc.top/image-20220927215228420.png" alt="image-20220927215228420"></p><h3 id="\u601D\u8DEF-1" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF-1" aria-hidden="true">#</a> \u601D\u8DEF</h3><p>\u4E2D\u5E8F\u904D\u5386\u76F4\u63A5\u6A21\u62DF\u9012\u5F52\u6784\u9020\u4E8C\u53C9\u6811\uFF0C\u5148\u627E\u5230\u6839\u8282\u70B9\u7136\u540E\u6839\u636E\u9898\u76EE\u8981\u6C42\u518D\u627E\u5230\u6839\u8282\u70B9\u7684\u5DE6\u8FB9\u8282\u70B9\u53F3\u8FB9\u8282\u70B9\uFF0C\u9012\u5F52\u5C31\u5B8C\u4E86\u3002</p><h3 id="\u4EE3\u7801\u5B9E\u73B0-1" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0-1" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// \u83B7\u5F97\u6570\u7EC4\u6307\u5B9A\u533A\u95F4\u5185\u7684\u6700\u5927\u7D22\u5F15</span>
<span class="token keyword">function</span> <span class="token function">findMaxIndex</span><span class="token punctuation">(</span>nums<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> left<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> right<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> temp <span class="token operator">=</span> nums<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> nums<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token operator">...</span>temp<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u5B9A\u4E49\u7684\u533A\u95F4\u4E3A\u5DE6\u53F3\u90FD\u95ED\u5408\u7684\u533A\u95F4\u4E5F\u5C31\u662F[0,nums.length - 1]</span>
<span class="token keyword">function</span> <span class="token function">constructMaximumBinaryTree</span><span class="token punctuation">(</span>nums<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u9012\u5F52\u904D\u5386\u6784\u9020\u4E8C\u53C9\u6811</span>
    <span class="token keyword">const</span> order <span class="token operator">=</span> <span class="token punctuation">(</span>left<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> right<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u9012\u5F52\u7EC8\u6B62\u6761\u4EF6</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">&gt;</span> right<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span>
        <span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token function">findMaxIndex</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> left<span class="token punctuation">,</span> right<span class="token punctuation">)</span>
        <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span>
        node<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">order</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
        node<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">order</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> right<span class="token punctuation">)</span>
        <span class="token keyword">return</span> node
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">order</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> nums<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_617-\u5408\u5E76\u4E8C\u53C9\u6811" tabindex="-1"><a class="header-anchor" href="#_617-\u5408\u5E76\u4E8C\u53C9\u6811" aria-hidden="true">#</a> 617.\u5408\u5E76\u4E8C\u53C9\u6811</h2><h3 id="\u9898\u76EE\u63CF\u8FF0-2" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE\u63CF\u8FF0-2" aria-hidden="true">#</a> \u9898\u76EE\u63CF\u8FF0</h3><p>\u7ED9\u4F60\u4E24\u68F5\u4E8C\u53C9\u6811\uFF1A root1 \u548C root2 \u3002</p><p>\u60F3\u8C61\u4E00\u4E0B\uFF0C\u5F53\u4F60\u5C06\u5176\u4E2D\u4E00\u68F5\u8986\u76D6\u5230\u53E6\u4E00\u68F5\u4E4B\u4E0A\u65F6\uFF0C\u4E24\u68F5\u6811\u4E0A\u7684\u4E00\u4E9B\u8282\u70B9\u5C06\u4F1A\u91CD\u53E0\uFF08\u800C\u53E6\u4E00\u4E9B\u4E0D\u4F1A\uFF09\u3002\u4F60\u9700\u8981\u5C06\u8FD9\u4E24\u68F5\u6811\u5408\u5E76\u6210\u4E00\u68F5\u65B0\u4E8C\u53C9\u6811\u3002\u5408\u5E76\u7684\u89C4\u5219\u662F\uFF1A\u5982\u679C\u4E24\u4E2A\u8282\u70B9\u91CD\u53E0\uFF0C\u90A3\u4E48\u5C06\u8FD9\u4E24\u4E2A\u8282\u70B9\u7684\u503C\u76F8\u52A0\u4F5C\u4E3A\u5408\u5E76\u540E\u8282\u70B9\u7684\u65B0\u503C\uFF1B\u5426\u5219\uFF0C\u4E0D\u4E3A null \u7684\u8282\u70B9\u5C06\u76F4\u63A5\u4F5C\u4E3A\u65B0\u4E8C\u53C9\u6811\u7684\u8282\u70B9\u3002</p><p>\u8FD4\u56DE\u5408\u5E76\u540E\u7684\u4E8C\u53C9\u6811\u3002</p><p>\u6CE8\u610F: \u5408\u5E76\u8FC7\u7A0B\u5FC5\u987B\u4ECE\u4E24\u4E2A\u6811\u7684\u6839\u8282\u70B9\u5F00\u59CB\u3002</p><div class="custom-container tip"><p class="custom-container-title">\u793A\u4F8B</p><p>\u8F93\u5165\uFF1Aroot1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]</p><p>\u8F93\u51FA\uFF1A[3,4,5,5,4,null,7]</p></div><p><img src="https://example.qingcc.top/image-20220928185423032.png" alt="image-20220928185423032"></p><h3 id="\u601D\u8DEF-2" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF-2" aria-hidden="true">#</a> \u601D\u8DEF</h3><ol><li><p>\u524D\u5E8F\u904D\u5386</p><p>\u5148\u64CD\u4F5C\u8282\u70B9\u7136\u540E\u518D\u8FDB\u884C\u9012\u5F52\u904D\u5386\u8FED\u4EE3\uFF0C\u9012\u5F52\u7EC8\u6B62\u6761\u4EF6\uFF1A\u4E24\u4E2A\u6811\u4E2D\u6709\u4EFB\u610F\u4E00\u68F5\u6811\u4E0D\u5B58\u5728\u8282\u70B9\uFF0C\u8FD4\u56DE\u53E6\u5916\u4E00\u4E2A\u8282\u70B9\uFF0C\u90FD\u5B58\u5728\u7684\u8BDD\u5C06\u4E24\u4E2A\u8282\u70B9\u7684\u503C\u52A0\u5230\u4EFB\u610F\u4E00\u4E2A\u8282\u70B9\u4E0A\u3002</p></li><li><p>\u4E2D\u5E8F\u904D\u5386</p><p>\u5728\u5904\u7406\u8282\u70B9\u7684\u65F6\u5019\u5904\u7406\u65B9\u5F0F\u662F\u4E00\u6837\u7684\u3002</p></li><li><p>\u540E\u5E8F\u904D\u5386</p><p>\u5728\u5904\u7406\u8282\u70B9\u7684\u65F6\u5019\u540C\u524D\u5E8F\u904D\u5386\u4E00\u6837\u3002</p></li></ol><h3 id="\u4EE3\u7801\u5B9E\u73B0-2" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0-2" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">mergeTrees</span><span class="token punctuation">(</span>root1<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span> root2<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root1<span class="token punctuation">)</span> <span class="token keyword">return</span> root2
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root2<span class="token punctuation">)</span> <span class="token keyword">return</span> root1
    root1<span class="token punctuation">.</span>val <span class="token operator">+=</span> root2<span class="token punctuation">.</span>val
    root1<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">mergeTrees</span><span class="token punctuation">(</span>root1<span class="token punctuation">.</span>left<span class="token punctuation">,</span> root2<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
    root1<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">mergeTrees</span><span class="token punctuation">(</span>root1<span class="token punctuation">.</span>right<span class="token punctuation">,</span> root2<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
    <span class="token keyword">return</span> root1
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_106-\u4ECE\u4E2D\u5E8F\u904D\u5386\u548C\u540E\u7EED\u904D\u5386\u6784\u9020\u4E8C\u53C9\u6811" tabindex="-1"><a class="header-anchor" href="#_106-\u4ECE\u4E2D\u5E8F\u904D\u5386\u548C\u540E\u7EED\u904D\u5386\u6784\u9020\u4E8C\u53C9\u6811" aria-hidden="true">#</a> 106.\u4ECE\u4E2D\u5E8F\u904D\u5386\u548C\u540E\u7EED\u904D\u5386\u6784\u9020\u4E8C\u53C9\u6811</h2><h3 id="\u9898\u76EE\u63CF\u8FF0-3" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE\u63CF\u8FF0-3" aria-hidden="true">#</a> \u9898\u76EE\u63CF\u8FF0</h3><p>\u7ED9\u5B9A\u4E24\u4E2A\u6574\u6570\u6570\u7EC4 <code>inorder</code> \u548C <code>postorder</code> \uFF0C\u5176\u4E2D <code>inorder</code> \u662F\u4E8C\u53C9\u6811\u7684\u4E2D\u5E8F\u904D\u5386\uFF0C <code>postorder</code> \u662F\u540C\u4E00\u68F5\u6811\u7684\u540E\u5E8F\u904D\u5386\uFF0C\u8BF7\u4F60\u6784\u9020\u5E76\u8FD4\u56DE\u8FD9\u9897 \u4E8C\u53C9\u6811</p><div class="custom-container tip"><p class="custom-container-title">\u793A\u4F8B</p><p>\u8F93\u5165\uFF1Ainorder = [9,3,15,20,7], postorder = [9,15,7,20,3]</p><p>\u8F93\u51FA\uFF1A[3,9,20,null,null,15,7]</p></div><p><img src="https://example.qingcc.top/image-20220928190622606.png" alt="image-20220928190622606"></p><h3 id="\u601D\u8DEF-3" tabindex="-1"><a class="header-anchor" href="#\u601D\u8DEF-3" aria-hidden="true">#</a> \u601D\u8DEF</h3><p>\u9012\u5F52\u8FDB\u884C\u5DE6\u53F3\u5206\u5272\uFF0C\u540E\u5E8F\u904D\u5386\u7684\u6700\u540E\u4E00\u4E2A\u8282\u70B9\u4E00\u5B9A\u662F\u5F53\u524D\u5C42\u9012\u5F52\u7684\u4E00\u4E2A\u8282\u70B9\uFF0C\u518D\u6839\u636E\u540E\u5E8F\u904D\u5386\u6700\u540E\u4E00\u4E2A\u8282\u70B9\u5728\u4E2D\u5E8F\u904D\u5386\u4E2D\u7684\u4F4D\u7F6E\u8FDB\u884C\u5206\u5272\u65B0\u7684\u524D\u5E8F\u904D\u5386\u548C\u4E2D\u5E8F\u904D\u5386\u7684\u6570\u7EC4\u3002</p><p><img src="https://example.qingcc.top/image-20220928191306091.png" alt="image-20220928191306091"></p><h3 id="\u4EE3\u7801\u5B9E\u73B0-3" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0-3" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">getIndex</span><span class="token punctuation">(</span>nums<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> nums<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token builtin">number</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">buildTree</span><span class="token punctuation">(</span>inorder<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> postorder<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>inorder<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>postorder<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>postorder<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token comment">// \u521B\u5EFA\u8282\u70B9</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span>postorder<span class="token punctuation">[</span>postorder<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>postorder<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> node
    <span class="token comment">// \u627E\u5230\u5206\u5272\u70B9</span>
    <span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token function">getIndex</span><span class="token punctuation">(</span>inorder<span class="token punctuation">,</span> postorder<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> inorderLeft <span class="token operator">=</span> inorder<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span>
    <span class="token keyword">const</span> postorderLeft <span class="token operator">=</span> postorder<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span>

    <span class="token keyword">const</span> inorderRight <span class="token operator">=</span> inorder<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment">// \u6CE8\u610F\u5206\u5272\u8FB9\u754C</span>
    <span class="token keyword">const</span> postorderRight <span class="token operator">=</span> postorder<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>

    node<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">buildTree</span><span class="token punctuation">(</span>inorderLeft<span class="token punctuation">,</span> postorderLeft<span class="token punctuation">)</span>
    node<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">buildTree</span><span class="token punctuation">(</span>inorderRight<span class="token punctuation">,</span> postorderRight<span class="token punctuation">)</span>
    <span class="token keyword">return</span> node
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,44);function k(m,v){const s=o("router-link");return c(),l("div",null,[n("nav",r,[n("ul",null,[n("li",null,[a(s,{to:"#_226-\u53CD\u8F6C\u4E8C\u53C9\u6811"},{default:t(()=>[p("226.\u53CD\u8F6C\u4E8C\u53C9\u6811")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#\u9898\u76EE\u63CF\u8FF0"},{default:t(()=>[p("\u9898\u76EE\u63CF\u8FF0")]),_:1})]),n("li",null,[a(s,{to:"#\u601D\u8DEF"},{default:t(()=>[p("\u601D\u8DEF")]),_:1})]),n("li",null,[a(s,{to:"#\u4EE3\u7801\u5B9E\u73B0"},{default:t(()=>[p("\u4EE3\u7801\u5B9E\u73B0")]),_:1})])])]),n("li",null,[a(s,{to:"#_654-\u6700\u5927\u4E8C\u53C9\u6811"},{default:t(()=>[p("654.\u6700\u5927\u4E8C\u53C9\u6811")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#\u9898\u76EE\u63CF\u8FF0-1"},{default:t(()=>[p("\u9898\u76EE\u63CF\u8FF0")]),_:1})]),n("li",null,[a(s,{to:"#\u601D\u8DEF-1"},{default:t(()=>[p("\u601D\u8DEF")]),_:1})]),n("li",null,[a(s,{to:"#\u4EE3\u7801\u5B9E\u73B0-1"},{default:t(()=>[p("\u4EE3\u7801\u5B9E\u73B0")]),_:1})])])]),n("li",null,[a(s,{to:"#_617-\u5408\u5E76\u4E8C\u53C9\u6811"},{default:t(()=>[p("617.\u5408\u5E76\u4E8C\u53C9\u6811")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#\u9898\u76EE\u63CF\u8FF0-2"},{default:t(()=>[p("\u9898\u76EE\u63CF\u8FF0")]),_:1})]),n("li",null,[a(s,{to:"#\u601D\u8DEF-2"},{default:t(()=>[p("\u601D\u8DEF")]),_:1})]),n("li",null,[a(s,{to:"#\u4EE3\u7801\u5B9E\u73B0-2"},{default:t(()=>[p("\u4EE3\u7801\u5B9E\u73B0")]),_:1})])])]),n("li",null,[a(s,{to:"#_106-\u4ECE\u4E2D\u5E8F\u904D\u5386\u548C\u540E\u7EED\u904D\u5386\u6784\u9020\u4E8C\u53C9\u6811"},{default:t(()=>[p("106.\u4ECE\u4E2D\u5E8F\u904D\u5386\u548C\u540E\u7EED\u904D\u5386\u6784\u9020\u4E8C\u53C9\u6811")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#\u9898\u76EE\u63CF\u8FF0-3"},{default:t(()=>[p("\u9898\u76EE\u63CF\u8FF0")]),_:1})]),n("li",null,[a(s,{to:"#\u601D\u8DEF-3"},{default:t(()=>[p("\u601D\u8DEF")]),_:1})]),n("li",null,[a(s,{to:"#\u4EE3\u7801\u5B9E\u73B0-3"},{default:t(()=>[p("\u4EE3\u7801\u5B9E\u73B0")]),_:1})])])])])]),d])}const b=e(u,[["render",k],["__file","refactor.html.vue"]]);export{b as default};
