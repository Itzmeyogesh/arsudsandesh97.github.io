import React from 'react'
import styled from 'styled-components'


const Button = styled.button`
    display: none;
    width: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.text_black};
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.8s ease-in-out;
`
const Card = styled.div`
    width: 330px;
    height: 490px;
    background-color: ${({ theme }) => theme.card};
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
    overflow: hidden;
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: all 0.5s ease-in-out;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 50px 4px rgba(0,0,0,0.6);
        filter: brightness(1.1);
    }
    &:hover ${Button} {
        display: block;
    }
`

const Image = styled.img`
    width: 100%;
    height: 180px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
    box-shadow: 0 0 16px 2px rgba(0,0,0,0.3);
`

const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`

const Tag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 2px 8px;
    border-radius: 10px;
`

const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Date = styled.div`
    font-size: 12px;
    margin-left: 2px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 80};
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`


const Description = styled.div`
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 99};
    overflow: hidden;
    margin-top: 8px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`

const Members = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
    margin-bottom: ${props => props.isLast ? '0' : '8px'}; // Add margin between sections
`
const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 12px;
    margin-left: -10px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: 3px solid ${({ theme }) => theme.card};
`

const MemberAvatar = styled(Avatar)`
    border: 2px solid ${({ theme }) => theme.primary};
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.1);
        z-index: 10;
    }
`;

const AssociationAvatar = styled(Avatar)`
    border: 2px solid ${({ theme }) => theme.text_secondary};
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.1);
        z-index: 10;
    }
`;

const ProjectCards = ({project,setOpenModal}) => {
    const placeholderImage = "https://via.placeholder.com/150";
    
    return (
        <Card onClick={() => setOpenModal({state: true, project: project})}>
            <Image src={project.image || placeholderImage}/>
            <Tags>
                {project.tags?.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
                ))}
            </Tags>
            <Details>
                <Title>{project.title}</Title>
                <Date>{project.date}</Date>
                <Description>{project.description}</Description>
            </Details>
            {/* Only render members section if there are members */}
            {project.members && project.members.length > 0 && (
                <Members>
                    {project.members.map((member) => (
                        <MemberAvatar 
                            key={member.id} 
                            src={member.img || placeholderImage}
                            onError={(e) => {e.target.src = placeholderImage}}
                        />
                    ))}
                </Members>
            )}
            {/* Only render associations section if there are associations */}
            {project.associations && project.associations.length > 0 && (
                <Members isLast={true}>
                    {project.associations.map((assoc) => (
                        <AssociationAvatar 
                            key={assoc.id} 
                            src={assoc.img || placeholderImage}
                            onError={(e) => {e.target.src = placeholderImage}}
                        />
                    ))}
                </Members>
            )}
        </Card>
    )
}

export default ProjectCards