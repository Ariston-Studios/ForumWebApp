import { useEffect, useState } from "react";

const greetings = [
    (name: string) => `The Force is strong with you, ${name}... But first, a username you must choose.`,
    (name: string) => `Ah, ${name}! The Sorting Hat says… You need a username first!`,
    (name: string) => `Why so serious, ${name}? Pick a username and let's get started!`,
    () => `Fortune and glory, kid… but first, let's get you a username.`,
    (name: string) => `Wake up, ${name}... The Matrix has you. But first, a username.`,
    () => (
        <>
            "You miss 100% of the usernames you don't create."
            <br />
            <div className="text-right text-base mr-5 mt-2">- Michael Scott</div>
        </>
    ),
    () => `Bears. Beets. Battlestar Galactica. And also, usernames.`,
    () => `Sometimes I start a username and I don't know where it's going. But you should!`,
    () => `This is a username emergency! And you are the only one who can solve it.`,
    () => `Your username choice is as fundamental as Schrödinger's cat. It both exists and doesn't… until you pick one.`,
    (name: string) => `I don't care what you do, ${name}, just set a username and don't break my servers.`,
    (name: string) => `Hey there, ${name}! Just a tiny step left...`,
    (name: string) => `Hi, ${name}. Let's complete your profile.`,
    (name: string) => `Greetings, ${name}! One final step to get you started.`,
    (name: string) => `Yo, ${name}! Just a quick step and you're in.`,
    (name: string) => `Hey, ${name}! You're almost there...`,
    (name: string) => `Welcome, ${name}! One last thing before we start.`,
    () => `Username? I barely know-her name.`
];

interface GreetingProps {
    name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
    const [greeting, setGreeting] = useState<React.ReactNode>(null);

    useEffect(() => {
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        setGreeting(randomGreeting(name));
    }, [name]); // Runs only when `name` changes

    return <h2 className="text-white text-lg font-playwrite text-center mt-4 mb-8 mx-auto">{greeting}</h2>;
};

export default Greeting;
