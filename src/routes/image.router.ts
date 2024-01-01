import { FastifyInstance } from 'fastify'
import { Aws } from '../helpers/aws';
import { Serp } from '../helpers/serp';


async function imageRouter(app: FastifyInstance) {
  app.addContentTypeParser(/^image\//, { parseAs: 'buffer' }, (req, body, done) => {
    done(null, body);
  });

  app.post(
    '/upload',
    {
      onRequest: [app.authenticate],
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              props: {
                type: 'object',
                properties: {
                  loaded: { type: 'boolean' },
                  result: { type: 'object' }
                }
              }
            }
          }
        }
      }
    },
    async (req, res) => {
      const fileBuffer = req.body
      console.log(fileBuffer)

      const contentType = req.headers['Content-Type'] || req.headers['content-type'];
      const imageData = await Aws.upload({ userId: req.user.id, fileData: req.body as Buffer, fileType: contentType as string })
      const serpData = await Serp.lens(imageData.props.imageUrl)
      res.statusCode = 200
      return JSON.stringify(serpData, null, " ")
    }
  )

}

export default imageRouter
