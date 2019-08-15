<!--
 * @Author: hucheng
 * @Date: 2019-08-15 11:35:41
 * @Description: here is des
 -->
# node-semaphore

node.js 的 semaphore 实现

Semaphore可以用于做流量控制，特别公用资源有限的应用场景，比如数据库连接。假如有一个需求，要读取几万个文件的数据，因为都是IO密集型任务，我们可以启动几十个线程并发的读取，但是如果读到内存后，还需要存储到数据库中，而数据库的连接数只有10个，这时我们必须控制只有十个线程同时获取数据库连接保存数据，否则会报错无法获取数据库连接。这个时候，我们就可以使用Semaphore来做流控

# 使用方式

```javascript

 let instance = new Semaphore(100)

instance.acquire(fn) // 获取一个许可证

instance.release()   // 归还许可证

````