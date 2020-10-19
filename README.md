# nuxt-ssr-with-sam

## 概要

SSR × Serverless × AWS で構築する Nuxt.js のアプリケーションの参考リポジトリ。
Serverless Framework で構成されものが多いため、SAM で構築してみた感じです。
[ブログにもまとめています。](https://www.tolog.site/aws/build-nuxt-ssr-with-sam))

## 特徴

* API Gateway + Lambda 上に Express を構築してミドルウェアとして Nuxt.js を配信する構成
* SAM でインフラコードを閉じ込めて、GitHub Actions を用いてインフラとアプリケーションコードを一元管理化
  * ただし、Route 53 と ACM はコード化せず、コンソールで管理する必要あり
* S3 に静的アセットを閉じ込めて CloudFront のキャッシュで高速化を図る、ただし直アクセスは制限したいため OAI で構成

## 構成図

![SSR×Serverless×AWSの構成図](https://github.com/canji53/nuxt-ssr-with-sam/blob/master/.documents/image/diagram.png?raw=true)
