import { HtmlElementComponent } from '../../share/html-element-component.ts'
import VideoHtmlComponent from '../../share/video-component.ts'

export default class EnjoyVideoHtmlComponent extends VideoHtmlComponent {
  constructor() {
    super({
      attributes: [
        {
          name: 'autoplay',
          value: '',
        },
        {
          name: 'oncanplay',
          value: 'this.muted=true',
        },
        {
          name: 'muted',
          value: '',
        },
        {
          name: 'loop',
          value: '',
        },
        {
          name: 'playsinline',
          value: '',
        },
      ],
      classes: ['enjoy__background__video'],
      children: [
        new HtmlElementComponent<'source'>({
          tag: 'source',
          text: 'Your browser does not support the video tag.',
          attributes: [
            {
              name: 'src',
              value: './video.mp4',
            },
            {
              name: 'type',
              value: 'video/mp4',
            },
          ],
        }),
      ],
    })
  }
}
