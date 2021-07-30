import 'antd/dist/antd.css';
import {useState} from 'react'
import styled from 'styled-components'
import {Button, Form, Input} from 'antd'
import {sendToBackend} from './utils/utils'
import ErrorView from './components/errorView'

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  min-height: 100%;
  flex-direction: column;
`

const Title = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`


const App = () => {
    const [errorStatuses, setErrorStatuses] = useState({})

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const [loading, setLoading] = useState(false)

    const handleError = (errors) => {
        setErrorStatuses(errors)
    }

    const onFinish = async ({name, email, password}) => {
        try {
            setLoading(true)
            await sendToBackend({name, email, password})
            setLoading(false)
        } catch (e) {
            console.log(e)
            setLoading(false)
            if (e.status === '400') {
                handleError(e.errors)
                return null
            }
        }

    }

    const getTextError = (name) => {
        if (!errorStatuses[name])
            return null
        return errorStatuses[name].join(', ')
    }

    const validateInputs= ()=>{
        return name!=='' && password!=='' && email!==''
    }

    return (
        <Container>
            <Title>
                Cтраничка регистрация
            </Title>
            <Form
                style={{
                    minWidth:400,
                    maxWidth:400
                }}
                onFinish={onFinish}
                layout={'vertical'}
            >
                <Form.Item
                    label="Имя"
                    name="name"
                >
                    <Input
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                    <ErrorView text={getTextError('name')}/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <ErrorView text={getTextError('email')}/>
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"

                >
                    <Input.Password
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <ErrorView text={getTextError('password')}/>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={!validateInputs()}
                    >
                        Поехали
                    </Button>
                </Form.Item>
            </Form>

        </Container>
    );
}

export default App;
