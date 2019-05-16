#### Divider 分割线

区隔内容的分割线

#### 何时使用

- 对不同章节的文本段落进行分割。
- 对行内文字，链接进行分割，例如表格的操作列。

> 基础演示

    export default {
      isViewFullBlock: true,
      height: 300,
      template: `
        <div>
          <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
          <Divider />
          <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
          <Divider>With Text</Divider>
          <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
          <Divider dashed />
          <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
        </div>
      `
    }


> type="vertical"

    export default {
      template: `
        <div>
          Text
          <Divider type="vertical" />
          <a href="#">Link</a>
          <Divider type="vertical" />
          <a href="#">Link</a>
        </div>
      `
    }

> align 设置文字的位置

    export default {
      isViewFullBlock: true,
      height: 300,
      template: `
        <div>
          <Divider align="ssss">Left Text</Divider>
          <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
          <Divider align="right">Right Text</Divider>
          <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
          <Divider align="right" dashed>Right Text</Divider>
        </div>
      `
    }

#### API

> Divider Props

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
type | 水平还是垂直类型 | string | horizontal 或 vertical | horizontal
dashed | 是否虚线 | boolean | - | false
align | 分割线标题的位置 | string | left、right 或 center | center