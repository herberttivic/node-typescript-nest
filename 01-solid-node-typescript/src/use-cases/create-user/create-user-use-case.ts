import { UserEntity } from "../../entities/user-entity";
import { MailProvider } from "../../providers/mail-provider";
import { UserRepository } from "../../repositories/user-repository";
import { CreateUserRequestDto } from "./create-user-dto";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailProvider : MailProvider
  ) {}
  public async execute(body: CreateUserRequestDto): Promise<UserEntity> {
    console.log("1")
    const userAlreadyExist = await this.userRepository.findByEmail(body.email);

    if (userAlreadyExist) {
      throw new Error("User already exist.");
    }
    console.log("1")

    const user = new UserEntity(body);
    console.log("1")

    const savedUser =  await this.userRepository.save(user);
    console.log("1")

    this.mailProvider.sendMail({
      from : {
        name : "Herbert Duarte",
        email: "herbertduarte@gmail.com"
      },
      to : {
        name : user.name,
        email : user.email
      },
      title : "Seja bem vindo!",
      content: "<p>Seja bem vindo à plataforma</p>"
    })
    console.log("1")

    return savedUser
  }
}
