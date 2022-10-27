import{_ as n,o as s,c as a,d as e}from"./app.71cb111c.js";const p={},t=e(`<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f0efc48e77a44feaa9d35e6caa2a605~tplv-k3u1fbpfcp-watermark.image?" alt="\u7C7B\u578B\u5224\u65AD.PNG"></p><h3 id="_1\u3001\u4F7F\u7528typeof\u8FDB\u884C\u7C7B\u578B\u6536\u7A84-\u57FA\u672C\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u4F7F\u7528typeof\u8FDB\u884C\u7C7B\u578B\u6536\u7A84-\u57FA\u672C\u7C7B\u578B" aria-hidden="true">#</a> 1\u3001\u4F7F\u7528typeof\u8FDB\u884C\u7C7B\u578B\u6536\u7A84\uFF08\u57FA\u672C\u7C7B\u578B\uFF09</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span>  <span class="token class-name"><span class="token constant">A1</span></span> <span class="token operator">=</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token keyword">type</span>  <span class="token class-name"><span class="token constant">B1</span></span> <span class="token operator">=</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token keyword">type</span>  <span class="token class-name"><span class="token constant">C1</span></span> <span class="token operator">=</span> <span class="token constant">A1</span> <span class="token operator">|</span> <span class="token constant">B1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> c1<span class="token operator">:</span> <span class="token constant">C1</span> <span class="token operator">=</span> <span class="token string">&#39;[]&#39;</span>


<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">A2</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">B2</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> age<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span>
<span class="token keyword">type</span>  <span class="token class-name"><span class="token constant">C</span></span> <span class="token operator">=</span> <span class="token constant">A2</span> <span class="token operator">|</span> <span class="token constant">B2</span>
<span class="token keyword">const</span> c<span class="token operator">:</span> <span class="token constant">C</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    age<span class="token operator">:</span> <span class="token number">12</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">f1</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// &#39;\u65E2\u4E0D\u80FD\u628Aa\u5F53\u4F5Cnumber,\u4E5F\u4E0D\u80FD\u5F53\u4F5Cstring&#39;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> a <span class="token operator">===</span> <span class="token string">&quot;number&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6B64\u65F6a\u7684\u7C7B\u578B\u662Fnumber</span>
        a<span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> a <span class="token operator">===</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        a<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;Never do this&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// instanceof</span>
<span class="token class-name"><span class="token keyword">const</span></span> <span class="token function-variable function">f2</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> Date <span class="token operator">|</span> Date<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// &#39;\u65E2\u4E0D\u80FD\u628Aa\u5F53\u4F5Cnumber,\u4E5F\u4E0D\u80FD\u5F53\u4F5Cstring&#39;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token keyword">instanceof</span> <span class="token class-name">Date</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6B64\u65F6a\u7684\u7C7B\u578B\u662Fnumber</span>
        a<span class="token punctuation">.</span><span class="token function">getDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6B64\u65F6\u662F\u6570\u7EC4</span>
        a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u590D\u6742\u7684\u6570\u636E\u7C7B\u578B\u4F7F\u7528typeof\u5173\u952E\u5B57\u4E4B\u540E\u90FD\u4F1A\u53D8\u4E3A\u5BF9\u8C61\uFF0C\u6240\u4EE5typeof\u6709\u4E00\u5B9A\u7684\u5C40\u9650\u6027\u3002</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/619abaa64d3b4e46829c69dacac1cc11~tplv-k3u1fbpfcp-watermark.image?" alt="typeof.PNG"></p><h3 id="_2\u3001\u4F7F\u7528in\u5173\u952E\u5B57\u8FDB\u884C\u7C7B\u578B\u6536\u7A84" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u4F7F\u7528in\u5173\u952E\u5B57\u8FDB\u884C\u7C7B\u578B\u6536\u7A84" aria-hidden="true">#</a> 2\u3001\u4F7F\u7528in\u5173\u952E\u5B57\u8FDB\u884C\u7C7B\u578B\u6536\u7A84</h3><p><code>in</code>\u5173\u952E\u5B57\u8868\u793A\u67D0\u4E00\u4E2A\u5C5E\u6027\u662F\u5426\u4F4D\u4E8E\u4E00\u4E2A\u5BF9\u8C61\u7684\u5B9E\u4F8B\u5F53\u4E2D\uFF0C\u4F8B\u5982<code>name in a</code></p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>
<span class="token doc-comment comment">/**
 * \u4E00\u65E6\u505A\u4E86\u7C7B\u578B\u8054\u5408\u5C31\u8981\u8FDB\u884C\u7C7B\u578B\u6536\u7A84
 */</span>

<span class="token keyword">type</span> <span class="token class-name">Person</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span>  <span class="token class-name">Animal</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    x<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u4F7F\u7528in\u4F5C\u7C7B\u578B\u6536\u7A84,\u4F46\u662F\u53EA\u9002\u7528\u4E8E\u90E8\u5206\u5BF9\u8C61\uFF0C</span>
<span class="token keyword">const</span> <span class="token function-variable function">f3</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> Person <span class="token operator">|</span> Animal<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span> <span class="token keyword">in</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        a <span class="token comment">// Person</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&#39;x&#39;</span> <span class="token keyword">in</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        a <span class="token comment">// Animal</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        a
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u4F7F\u7528\u903B\u8F91\u8FDB\u884C\u7C7B\u578B\u6536\u7A84</span>
<span class="token keyword">const</span> <span class="token function-variable function">f4</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        a <span class="token comment">// string[]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">f5</span> <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">===</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        x <span class="token comment">// string</span>
        y <span class="token comment">// string</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3\u3001\u533A\u5206ts\u7C7B\u578B\u7684\u5B8C\u5168\u4E4B\u6CD5-\u7C7B\u578B\u8C13\u8BCD-\u7C7B\u578B\u5224\u65AD-is" tabindex="-1"><a class="header-anchor" href="#_3\u3001\u533A\u5206ts\u7C7B\u578B\u7684\u5B8C\u5168\u4E4B\u6CD5-\u7C7B\u578B\u8C13\u8BCD-\u7C7B\u578B\u5224\u65AD-is" aria-hidden="true">#</a> 3\u3001\u533A\u5206ts\u7C7B\u578B\u7684\u5B8C\u5168\u4E4B\u6CD5\uFF0C\u7C7B\u578B\u8C13\u8BCD/\u7C7B\u578B\u5224\u65AD is</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// \u533A\u5206ts\u7C7B\u578B\u7684\u5B8C\u5168\u4E4B\u6CD5\uFF0C\u7C7B\u578B\u8C13\u8BCD/\u7C7B\u578B\u5224\u65AD  is    \u4F18\u70B9 \uFF1A\u652F\u6301\u6240\u6709\u7684TS\u7C7B\u578B</span>
<span class="token keyword">type</span> <span class="token class-name">Rect</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    height<span class="token operator">:</span> <span class="token builtin">number</span>
    width<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">Circle</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    center<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    radius<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">f6</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> Rect <span class="token operator">|</span> Circle<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRect</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        a <span class="token comment">// Rect</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        a <span class="token comment">// Circle</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5224\u65AD\u4ED6\u662F\u4E0D\u662FRect\u7C7B\u578B</span>
<span class="token doc-comment comment">/**
 * \u5FC5\u987B\u5199\u6210function\u7684\u5F62\u5F0F
 * <span class="token keyword">@param</span> <span class="token parameter">x</span>
 */</span>
<span class="token keyword">function</span> <span class="token function">isRect</span><span class="token punctuation">(</span>x<span class="token operator">:</span> Rect <span class="token operator">|</span> Circle<span class="token punctuation">)</span><span class="token operator">:</span> x <span class="token keyword">is</span> Rect <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;height&#39;</span> <span class="token keyword">in</span> x <span class="token operator">&amp;&amp;</span> <span class="token string">&#39;width&#39;</span> <span class="token keyword">in</span> x
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4\u3001\u7ED9\u5BF9\u8C61\u6DFB\u52A0\u5C5E\u6027\u533A\u5206\u4E0D\u540C\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#_4\u3001\u7ED9\u5BF9\u8C61\u6DFB\u52A0\u5C5E\u6027\u533A\u5206\u4E0D\u540C\u7C7B\u578B" aria-hidden="true">#</a> 4\u3001\u7ED9\u5BF9\u8C61\u6DFB\u52A0\u5C5E\u6027\u533A\u5206\u4E0D\u540C\u7C7B\u578B</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// \u66F4\u7B80\u5355\u7684\u65B9\u6CD5\uFF1F a.kind\u533A\u5206a\u7684\u7C7B\u578B</span>

<span class="token comment">//\u901A\u8FC7\u6DFB\u52A0\u4E00\u4E2Akind\u5B57\u6BB5\u8BC6\u522B\u4E0D\u540C\u7684\u7C7B\u578B</span>
<span class="token keyword">interface</span> <span class="token class-name">Circle1</span> <span class="token punctuation">{</span>
    kind<span class="token operator">:</span> <span class="token string">&#39;circle&#39;</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Square1</span> <span class="token punctuation">{</span>
    kind<span class="token operator">:</span> <span class="token string">&#39;square&#39;</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Shape</span> <span class="token operator">=</span> Circle1 <span class="token operator">|</span> Square1
<span class="token keyword">const</span> <span class="token function-variable function">f7</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>kind <span class="token operator">===</span> <span class="token string">&#39;circle&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        a <span class="token comment">// A</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        a <span class="token comment">// B</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> button <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;xxx&#39;</span><span class="token punctuation">)</span>
button<span class="token operator">?.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> Event<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">//e as MouseEvent</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// any\u5E76\u4E0D\u662F\u8868\u793A\u7684\u6240\u6709\u7C7B\u578B\uFF0C \u7C7B\u578B\u4E00\u65E6\u8054\u5408\u53D8\u91CF\u5C31\u4E0D\u80FD\u4F7F\u7528\u4E86\uFF0C\u9700\u8981\u505A\u7C7B\u578B\u6536\u7A84\u3002</span>

<span class="token comment">// unknown\u662F\u6240\u6709\u7C7B\u578B\u7684\u8054\u5408\uFF0C\u9700\u8981\u8FDB\u884C\u7C7B\u578B\u6536\u7A84\u6BCF\u6B21\u53EF\u4EE5\u9009\u62E9\u4E00\u4E2A\u7C7B\u578B\u3002</span>
<span class="token keyword">const</span> <span class="token function-variable function">f8</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> a <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        a <span class="token comment">//string</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token keyword">instanceof</span> <span class="token class-name">Date</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        a<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Date</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> a <span class="token operator">===</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        a
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5\u3001\u7C7B\u578B\u7CFB\u7EDF\u7684\u4EA4\u96C6" tabindex="-1"><a class="header-anchor" href="#_5\u3001\u7C7B\u578B\u7CFB\u7EDF\u7684\u4EA4\u96C6" aria-hidden="true">#</a> 5\u3001\u7C7B\u578B\u7CFB\u7EDF\u7684\u4EA4\u96C6</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// *--------------------*</span>
<span class="token comment">// \u7C7B\u578B\u7CFB\u7EDF\u7684\u4EA4\u96C6</span>

<span class="token keyword">type</span> <span class="token class-name">\u6709\u5DE6\u624B\u7684\u4EBA</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    left<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">\u6709\u53F3\u624B\u7684\u4EBA</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    right<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a<span class="token operator">:</span> \u6709\u5DE6\u624B\u7684\u4EBA <span class="token operator">=</span> <span class="token punctuation">{</span>
    left<span class="token operator">:</span> <span class="token string">&#39;\u5DE6&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// right:&#39;\u53F3&#39; // error</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> doubleHands <span class="token operator">=</span> <span class="token punctuation">{</span>
    left<span class="token operator">:</span> <span class="token string">&#39;\u5DE6&#39;</span><span class="token punctuation">,</span>
    right<span class="token operator">:</span> <span class="token string">&#39;\u53F3&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">delete</span> doubleHands<span class="token punctuation">.</span>right
<span class="token keyword">const</span> b<span class="token operator">:</span> \u6709\u5DE6\u624B\u7684\u4EBA <span class="token operator">=</span> doubleHands <span class="token comment">// ok</span>


<span class="token comment">// \u63A5\u53E3\u4E5F\u80FD\u4EA4\u96C6</span>

<span class="token keyword">interface</span> <span class="token class-name">Colorful</span> <span class="token punctuation">{</span>
    color<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">CircleFul</span> <span class="token punctuation">{</span>
    radius<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span>  <span class="token class-name">CircleColorful</span> <span class="token operator">=</span> Colorful <span class="token operator">|</span> CircleFul

<span class="token keyword">type</span> <span class="token class-name">Person1</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token builtin">string</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">User</span> <span class="token operator">=</span> Person1 <span class="token operator">&amp;</span> <span class="token punctuation">{</span>
    <span class="token comment">// id:number;</span>
    email<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u5047\u5982\u4E24\u4E2A\u5C5E\u6027\u7684\u7C7B\u578B\u51B2\u7A81</span>
<span class="token keyword">const</span> u<span class="token operator">:</span> User <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// id:1  id\u7684\u7C7B\u578B\u662Fnever</span>
    id<span class="token operator">:</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span>
    name<span class="token operator">:</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    email<span class="token operator">:</span> <span class="token string">&#39;1&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5047\u5982\u4E24\u4E2Atype\u4EA4\u96C6\u51B2\u7A81\uFF0C\u51FD\u6570\u7684\u4EA4\u96C6\u4F1A\u5F97\u5230\u51FD\u6570\u7684\u5E76\u96C6\u3002</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">AA</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">method</span><span class="token operator">:</span><span class="token punctuation">(</span>n<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">BB</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">method</span><span class="token operator">:</span><span class="token punctuation">(</span>n<span class="token operator">:</span>Date<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span> <span class="token operator">&amp;</span> <span class="token constant">AA</span>

<span class="token keyword">const</span> bb<span class="token operator">:</span><span class="token constant">BB</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
 <span class="token function-variable function">method</span><span class="token operator">:</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token operator">=&gt;</span><span class="token punctuation">{</span>
     <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),o=[t];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","uniontype.html.vue"]]);export{r as default};
