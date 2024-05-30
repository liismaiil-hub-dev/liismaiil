import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

const router = createRouter<NextApiRequest, NextApiResponse>();

const Bot = (function () {
  let bot: Telegraf<Context<Update>> | any;
  function createInstance() {
    bot = new Telegraf(`${process.env.TELEGRAM_TOKEN}`);
    return bot
  }
  return {
    getInstance: function () {
      if (!bot) {
        bot = createInstance();
      }
      return bot;
    },
  };
})();

router
  // Use express middleware in next-connect with expressWrapper function
  .use(async (req, res, next) => {
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })
  .get((req, res) => {
    res.send({ success: true, message: process.env.TELEGRAM_TOKEN });
  })
  .post(async (req, res) => {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    try {
      console.log({ body: req.body, token: process.env.TELEGRAM_TOKEN });
      const { title, description, author, startDate, endDate, stages } = req.body.input;
      console.log({ title, description, author, startDate });

      //`6500496540:AAFPGnKjmNd98kx5Rp4fPO7a6Ktdvf3MvbU
      const bot = Bot.getInstance()
      bot?.start((ctx) => {
        ctx.reply(`ALLAH AKBAR`);
        ctx.reply('you are on liismaiil sprint bot notifications');
      });
      bot.command('echo', async (ctx, next) => {
        try {
          ctx.reply(`${title}`);
          ctx.reply(`${description}`);
          next(ctx);
        } catch (error) {
          console.log({ error });
        }
        // Explicit usage
      });
      bot.on('text', async (ctx) => {
        // Explicit usage
        await ctx.reply(`https://liismaiil.org/sprint/${author}`);
        // resend existing file by file_id
        /*await ctx.replyWithSticker('123123jkbhj6b')

        // send file
        await ctx.replyWithVideo(Input.fromLocalFile('/path/to/video.mp4'))

        // send stream
        await ctx.replyWithVideo(
          Input.fromReadableStream(fs.createReadStream('/path/to/video.mp4'))
        )

        // send buffer
        await ctx.replyWithVoice(Input.fromBuffer(Buffer.alloc()))

        // send url via Telegram server
        await ctx.replyWithPhoto(Input.fromURL('https://picsum.photos/200/300/'))

        // pipe url content
        /*   await ctx.replyWithPhoto(
            Input.fromURLStream('https://picsum.photos/200/300/?random', 'kitten.jpg')
          )
     */
      })

      bot.command('quit', async (ctx) => {
        // Explicit usage
        await ctx.telegram.leaveChat(ctx.message.chat.id);

        // Using context shortcut
        await ctx.leaveChat();
      });

      bot.on('callback_query', async (ctx) => {
        // Explicit usage
        await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

        // Using context shortcut
        await ctx.answerCbQuery();
      });

      /*  bot.on('inline_query', async (ctx) => {
          const result = [];
          // Explicit usage
          await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);
    
          // Using context shortcut
          await ctx.answerInlineQuery(result);
        }); */

      bot.launch();
      // Enable graceful stop
      process.once('SIGINT', () => bot.stop('SIGINT'));
      process.once('SIGTERM', () => bot.stop('SIGTERM'));
    } catch (error) {
      console.log({ error });
    }

    res.json({ corps: req.body });
  });
/* 
export const config = {
  runtime: "edge",
};
 */
export default router.handler({
  onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end('Page is not found');
  }
});

//TODO .use(authCheckMiddleware)

/* bot.on('text', async (ctx, next) => {
  // Explicit usage
  //await ctx.telegram.sendMessage( `Salam Alikom Nous allons vous repondre }`);
  await ctx.reply( `Salam Alikom Nous allons vous repondre }`);
next(ctx)
});
 */
/*     bot.start((ctx) => {
      ctx.reply('You start ALLAH  Akbar');
      ctx.reply(`Bien venudo ${ctx.from.first_name} ${ctx.from.last_name}`);
    });
    bot.command('echo', async (ctx, next) => {
      try {
        const input = ctx.message.text;
        const inputArray = input.split(' ');
        console.log({ inputArray });
        if (inputArray[1].startsWith('a')) {
          ctx.reply('y have a qq chose');
          next(ctx);
        }
      } catch (error) {
        console.log({ error });
      }
      // Explicit usage
    });

    bot.command('quit', async (ctx) => {
      // Explicit usage
      await ctx.telegram.leaveChat(ctx.message.chat.id);

      // Using context shortcut
      await ctx.leaveChat();
    });

    bot.on('callback_query', async (ctx) => {
      // Explicit usage
      await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

      // Using context shortcut
      await ctx.answerCbQuery();
    });

    bot.on('inline_query', async (ctx) => {
      const result = [];
      // Explicit usage
      await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

      // Using context shortcut
      await ctx.answerInlineQuery(result);
    });

    bot.launch(); */
/*     res.send(
      { 
        title,
        description,
        image_url,
        author, 
      
      }
);
 */ // Enable graceful stop
/* process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); */
