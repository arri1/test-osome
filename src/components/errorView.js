import styled from 'styled-components'

const ErrorText = styled.div`
  font-size: 10px;
  color: red;
  white-space: nowrap;
  display: flex;
`
const ErrorContainer = styled.div`
  min-height: 15px;
`
const ErrorView = ({text})=>{
    return (
        <ErrorContainer>
            <ErrorText>
                {text}
            </ErrorText>
        </ErrorContainer>
    )
}

export default ErrorView
