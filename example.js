import {play} from './src'

// a component that we'd like to play
const List = {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  render(h) {
    return (
      <ul>
        {this.data.map(item => (
          <li>
            <a href={item.html_url}>{item.full_name}</a>
          </li>
        ))}
      </ul>
    )
  }
}

play({
  Button: {
    'with text'(h) {
      return <button on-click={() => this.$log({foo: {bar: 123}})}>Text</button>
    },
    'with emoji'(h) {
      return <button>😄🤗😃😐😲</button>
    }
  },
  List: {
    'preset data'(h) {
      const data = [
        {html_url: 'https://github.com/vuejs/vue', full_name: 'vuejs/vue'},
        {html_url: 'https://github.com/egoist/eva.js', full_name: 'egoist/eva.js'}
      ]
      return <List data={data}/>
    },
    'fetch data': {
      sample: '<List data={this.repos}/>',
      data() {
        return {repos: []}
      },
      created() {
        fetch('https://api.github.com/users/egoist/repos')
          .then(data => data.json())
          .then(data => this.repos = data)
      },
      render(h) {
        if (this.repos.length === 0) {
          return <span>Loading repos...</span>
        }
        return (
          <List data={this.repos}/>
        )
      }
    }
  }
})
