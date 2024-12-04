import React, { useState } from "react";
import Avatar from "../Shared/Avatar";
import { IoIosVideocam } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FaMicrophone } from "react-icons/fa";
import { PiImagesSquareLight } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";

const MessagePage = ({ name, picture }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [image, setImage] = useState(null);

    // Dummy conversation data
    const conversation = [
        { sender: "User 1", text: "Hi, how are you?", image: "data:image/jpeg;base64,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" },
        { sender: "User 2", text: "I'm good, thanks! How about you?", image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAxgMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xAA+EAACAQMCAwQIBAQFBAMAAAABAgMABBEFEgYhMRNBUWEiMlJxgZGhsQcUQmIjcsHwFSRD0fFTgpLhM0Rj/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAEDAgQF/8QAJBEAAgICAgEFAAMAAAAAAAAAAAECEQMhEjFBBBMiMlEUQlL/2gAMAwEAAhEDEQA/ANBo8e60FMrZbrmVv3VK0E7rEDzNSIF9Ob+etNWTTooLmwV7hty1Hj0tJLkoF6NWjmhzIx8hQ06D/Mv76nxNqRdaTpkaW6+j3VRcT6Okq7lrWW7bF21FvIe3bFHEdnJ77SvyKi4X0W3ZLV03g25/MaXA3lioetaEtzZ7PGrjhDTV0/Tki9kVmOmNu0X+3nRMKfAwKS/SqtmRpA3s08BTadadpDBSGLezSjSaACBb2aVmk0M0xBlqLc3s0M0KADBo6TR5oGFlvZoA0dCkARFJYcqXRUANHd7NCnCKFFiOc6BbTW1vsmXoxxVzDZ8pGqZsiT0V99Ohd0JHjWJcrVAkq2ULcmI8BTmmr/GNKubKQMzDpmlaYjrI27xqpitl7GPTPuptxtfNOKdrE+VRZp1UmkbD1FilnvHXuqNoeuo7m3kbZKp+dLuplltseVY6/ieK67aLrnNYdmk0dVhfevrUbdKymgcQRTxrHK2JuXLxrSpKH6dKaYhxOtPY/dTINOKeVMA9v7qGKOhmgBJWk7P3UvNHQAgLR4o80M0AJ2/uobf3UqhQAWKIilZos0AJ2/uoClE0gutABmjpOaFAHPbfUnfW7mBl5IBV22orHNHH41nLeJxxJdFl5FR96k3q/wCfj/lNaommabtY5FC+NBIo1qhaWRNuG5bqmWs7SSRjyNKh2W4A3cumKptZPZIW8OdXJO1R7qodcftlkXwFNIb2Va6zGUwWXIqvur+KVvRbnVfDp0jyFvWyeS+FWlpw25O89etDM0xFlGWuY5I+ua3+mzHsl31RabYdjKgdeYHKtNbwqDnbU62UtkvKnn40qNudIwq86TuolNIaRMB5UgtH37c1EJ5+q1AnbzYFR51P3WPiTFKfp20qqtriDft7ePd7IcA/KnkuHjcBgSn2prL+oOJOIotq0SsCAQcg9DSqqZCoUW79pobv2tQANq0g+jTlNy+oaAI13crFGXZulZ264jijkIyzYNOcR3XZwGNd249axDqxkz41z5M3F0Tcjodhq8NzAG3AeVCsVaytGmN1Co/yh2zeDT41kZ9q86Ym0qKSUErzA5VZjdSq7rHRRzaQDyXr1pEFg0cqt4VfkUhk/lp2FESVdygVU3VozvJleWKv1XnRvCpGaLFRkLTTuzBk86uI2jVV3etirP8AK8iPR51Fm0/cKXY+hpSpcHxqyhbalVsdk0Tj0qlEspQbgMc8msZHxRqG2Stx9fljGeZrHa/x7aWLtb6XGLuZf9RiezU/dvt51RcdcVG6ebSrKXs7SIkXEqnBc+z/ACj69OnXEJK0sRe2CR268zcTE7AP2jq30HnWMeNVykbk23SNHecV63eZMuovEnswnswvlyqCJbm+PMzXGf1yyHb9ck/AGste8SWts22xja6mX/Xn5KP5QP6AVWXOvapc5VrucDvERCD6VS3/AFWhKMV2zosekysBvnRP2xx5x8Sf6VaWf+MWKCOy4guo0xyRkjdR7gVrjfb3jEES3TMx5fxm6/OrtJOI9Mtop1ubgKRkrI+8AfGoyjN+SkXj/wAnWbfifiyw/XpupRj1o5IzA59zKSv0q60r8StKnlW21y3n0a5Y4H5nDROfBZBy+eK5jw3xhHfTra6jGIrjojpyVv8AY1rLi3iurd4LmFJo26o4/vH9+VYWaUHU0b9mMtxZ1ZHV41dGDKwBDKcgjxFG3ojNcSstT1XgScTaYXvdEZsz2DtkxDxQ9328fGut6PrVjrumQ6jps4lglXqeoPepHcRXSpKStHPJOLpj11eLEDuaqm716CNCC3MdKe1aDtEYr1xWKvopA1c+Sck9GGHqepNeTkhuVQo23HFNyRFeZbnQRtoFcck2zI5NJswKFRpp1PzoU/bYHXM8qMGhjkKLYteobFA0TGgFoN0oASo505mmsc6BWgB3NCmxSLm6hs7aW5upVhghQvI7thVA6kmmA5JjqeYHMnwrE8TcdabYXUllpqNqWoINrxwnCQnu3v0GD3cz5VGvYOJONIh+Tm/wXQZByLsRc3KeOB6inw6nvpdpwFZWtstrBfIhX9KwjH3qWSX4iuOFvZzC6hhsrc3usukpBysSg9mG8h+o+ZNZTUtUudWnPaEpB1WLu9/ma1P4l6HeWPEEdmLj85F2O9BFGR2YyQdw8azNrbzKroISXOQkeAcnwpwWrY5tLSI1vD2ijHVj9KtYbWMqAThc5J8BV+OG91tbYmjjnWPEzAk5bJ6e7kKWeH3a6t1WSHDEKyAkY6Ddz7u/AqjTomnFui64M4dglUX1xGpycRg9wrR6ppcM1uYmiGCDVvpa6fY28Nr20asFVU3MAT3Drzo7+802Fyk91DG4O0qXGQfCuWVt2dUeKVHCdb01tP1GSNFI2nch8uo+tdF4SvzqGkQSyEkj0XPjg7f6j5Cqf8QIYGvLeaCVJEcEb1wfr8aHAFz/AA57f2G3D44z9h86Mu4WENSNfKocAMOTcjnvzjP3+lUfBF5NoHG1/olsQLS7TtlT2WxnPyyPgKvc4XmOnRvl/wCqq/w5tm1rjLVtaxutbVfy8J9pjj7AfWp+nt2L1H1OhXd9/C9LpWV1G6TtCy9Sa0GtqFgKqtVGn6WtwN0i8+6uhwbOV0QIoHuAOzXmadOkXLKR/StZp1jHAqjbVrJHGBhuQ+1L2V5MNHJr7T7iGTa2aFdKureOYAMvog8qFHtDUSz3rgUYaqxr3lSTd8qtaNUy0Mi0h519qqz8y1EZGelyHxZYrOuaNplquXdSsNRyHxJjXKjlVNr2nf4+1naTEf4ck4muoz0l280Q+W4gn+XFTljLMN1TnXEIHohQOvfWZS0ajHZGuBbkmKSVssOQD42+6sXxHwRe36yy6ZxFd5ZweymkwoHsgqOnvFaq61OzscqxRd2AzP8Aqzy51V6vFfGNbrh+SMyqdz2szFVkH7W/Sfp7qipHRx0cm1jRdQ0nUPzWurcSFwUjaaTdGfcQfjjPwqug09r29ZtNjZriUkJF2noDuJ78dTW81zjKbULCbQZdEu49QuWWIrOE2g7hjGD49D0zVDHaalp2s/4U8L2c1zHhy4BYIe9SCR0DfauqLtHJONMaj06KFTDNd3NzcJ/8iWBJRD4FjRf4bC7ohuLyzmLDsTdZK7s+Rwe8Yz4deh1KxW1vbqqBUjUYVAen+5rPazfxxRsjKCjcmRuhHj761fgn1satdEn13X7kToq3awgHfknAIAAwM945+FJs53SS7uH0KO8tbeTs5LmW4yzOcdSSM+t9fI4kcFW2naprn5TVzK6dkTCQ2C2ORBPUDB+eapdcgSz1W/VO1fTYHYmHdtLsjEJkjwOMkf7Yy0mqN/JfIseJhBNaWtzb2JtQzHMZHLoe/pTXAwxqLqerLVlrCb/w30qebZ2qLHv2sCRnl3d/iKzvDl0LDUGlcFgvPAGT44rmkm1R2dNSNlxXeXEdvDpunDtNQ1BxDCg6jPf/AH5mui8K6BFw7odtpsB3dmuZHP63PrE+81mPw+4eunu34n1yMpdzpttID0giPl7R+3vroINUxQUI0c+STkyuuoFmFJtoexxVkVptlqhMZbmKbk3MMFuVOEUg0xDeCQAXzihRk0KAISrTgWjUU6BUiwhRToWjApYFAhOKUP5aUBSq0gEgZU5691LUfnbYntMc8UQFV91ctZykjJBbJA91TnopDbKjibgHTteMR1G7u0WM7isMu1W9+QfpipGk6BpWkgR2d1eIijGHuTIOX82fpTGtzXOo2ckdldy2rFcb9vqnx5iuG3sWswNONTnvTMkjCbdOwXOfsetKK5LRuTcOzt95E+p8UafbxRJLY2TNdvcbstuAwsfl6RDZ/bioH4l20llqWmcRxjMEINvcEfp3HCsfLmy/9wqF+Dc1y2k3WqancyvBK/5aBZCDyUZJzjnzOP8AtNbW6v8ATp7aSxvQksU4KSRMoIYEd48DT5KLpia5q6OZtexzRssqekejd1U1zpPbyGRs9nnJfqT7h3nuxWw1fgSeGPteFr1HUf8A1bxzkeSydfgwPvFZw8PcY3N2tpeW35KAqd0yuGGPAHdmrKcWjneN2I4JhxxWZYxvitImRn8WOMgfKm/xBmij1LV3t48mRVQpjozqqnHxOffW24a4aXRbFkOd2c/81gUs9Ru9buru9RBZ/mJchvWYqx5gY6ZH0qSlttl3jtKKIOrJa2OjWNuZpFuLhUFyA3olhzz86LSv4N0kuc4KnPjVJxRfC51Tso/UiyOXiakaVI4T0GOeWM9KdWrYm96PSWl3f5qxhuF5hk5jzqYC3urnvCvFq6dHHp+v20lkxJKTkfwzkfT4Z+Fb+KVJ0WWBxIjDkyEEEeORW0iXkdDUruprOO6jBoEKKZ57abeOnFkxSyd1FiaILJQqU0dHTsVFStPA0wDTimsFR0UofzU3mlA0AOLS6bBpQagQdRb2JSvaN3VKzRyMyR++sZOjcOzPz3u8dnFg7e891ck/Eu9D6oUV1Yqg7UDpu5/0+9dX1ze0ZWMEu52rhsZJ+OPCuH8T2N3Z3cwvYXVn9IkNvxnxYVnHZXI6Rt/wr4ntp9GXh2dlhmiLNF/+2WLEjzGengPfWsuYWeQLOCvsyrXnmMtE25GIYekrA42nuPKvRWkXCzaFZXRk3RXNvG53c8EqD1pZY7seKeqHba2u7Q7vzAePxGQasLfVcHspSx8z0rP3OoOjbIipXpTa3hb16knRVxs1z3UTDKd/KubfiJqEOj29wVGZpjiMHvJ5/wBa1thJ2hAFc1/F+wc8QWkjOeymtwVHXmORx9PnVIbZKa4o57b7gsk0gBZ25Fu/xrU8KWrajqkFvHGNm4b27lA6ms9JBKzqixbU/Sa6L+Hd1FosYX8pG878zK2ciryV6IRdbOsWunW9xpzQX1vHLE5z2coBwByB8jT2jaVaaNbNa2KyLEZDJiRi2CcZxn3ULfU7WYJg7WYA86l7s9DnzrVNKibabsUBgY3UAKL0qNetZNUK2UW1l57qeROQ9KikZYudNC7Ep6XtUdBLhGXIoUwopwaUDQFvJ7NOi3bApbHaYlacFMt6BI8KAkWka4sezSgKajfe4UVKeAJG0jlVVBQZr9ErzYL407KMKR4CounsJd1xgkMfQPiB/wC6du5NsRqUmVijK8SXfYtH5GsBqdvbytOx5r+rHPJ6n+nzrUcXzBpoiem4k+4VnWjI0pnf/Uyze7+/tV8K+BHM/mc81O2ILPEPQyQPE1sOAuKrux0ltMuI3nt8nswMbk8hnrz6ZrMC1mudRljtHG3PpjqM+6tlwhoQa1WRjktnn4im4p6YlJraLi31WyvwXicK3Qo3okeVSoGzIF8ar9U4dNlM11Av8J+Ug8PBhU3S9RtLSAQ3kgDEeiuCSceAA+Fcs8daR2Qypq2abSwoIHgKovxd08T6Dp94vJ7a6A3+COCD9dlXuhywXUazQEsDjqMH5U5xtbR3vC1/bylQ2wPGpO3LIwZV+JAHxpY7UqM5WpRs4oVEcIkfHLxq40bVLIBVknSJ26ZOM1XXaZt3HLpnnUn8rEyxMyp6SYPvrtas4kzUQa4w1AQJKp2oNrj91XUGvTR3UksTYGNoyeWB3ke/Nc80Ri13NMvqKSR8OS/0q8im7bbGOUYPpfuNEtKgjt2dL0TiaOciK7PNjhJMYB8jU3WtQWzG7O7yzXPrf+FGXZ1QcvW7vdWz0ZbfVLBBNIXK8iO/HdU2XxOMZXIm6Rqy3MW/Zt99PamzzxFYlOTy5U5bWtvartRFWjlu4YhzahJ1RmU05coqiDYWc0UeGOD76FCbVo8+irGhTSE5tuy4DLRSuvZGqc6nSJNSZ0K1ptUYRQa9rD22odknhUAcQS99PappNxfXRlSoZ4bu19quSSlej38Wf00YLkWuj60816it31odRvzdyLp1ucFsbzWSstGubaVZfS5VouH7ErJNdyrhpDtU/f5/0rUXJLZx+slinNPGX8KhEVFGFUAAVE1KTCsPAVJDYUmqnU39E1hvRBdnNOKr24n4lt9Pttu0oDJlcnnn+g+tN8TzC2sVWL1do+n94oW2294z1S725FuwhDMcjIAyMf31pOvqtzqEFoPSwQSo8yMD4nFdsFUTjm7kVnDmkTflZHVczSglm8K6Xw7oxsoLWN/+mDVlYaBBYWkVsFzMygzOf1N4e4Vc3UGxIT6PoU0gbID26Kp3jepGMGuQalZM/FV9CVCkXIhiDHGxeWCPDr18q7WUbaPVrJcU8Oy3Ekt/p8SPPJGVmi5KZMAhWU+Iz9KTQWYJOIJLOYQxys6MdiyR7hkc8Ec+Q6mjtjeaxqOy3Sad2xjblgvxPT403pHDV/d6iscsDwwr6zM3d4V1vR9Mg061EVtGsQ8AOtSlmS6KRwt9nH9W06fTtRmsJk/iqS458sNzHOmLuUQ2oPgjEfD/AJra/inp8saW2swhcp/BlJznrlT9/pXM9cumjS2ATAdCD9KrCVqyc406LPTB2VgFHrOwB92M/wC1XcAKYwdrfSqLh8vPbrI6YBYsn2zWkt2jiXOd/n4UpPY4rRJs4syB5iSMZy3jV9wzdldQcRtyWI/cVmJLiR2CodqmrvhZNt7Ng5PZ9ayaNfNO7eszYqK5oNuppjWjATUdIJoUAXqWUYAFA2kefVp5RTqpUigxHCqU9sWnClRb25t7GCS5vJVjijXJZj9K0Ysa1SaK0s3mfb4DzP8Af2p+AKI0CeoFG33VgtU1mTVB2pIETc403c1U9PmOdX/CuprPYrbSuO2iOFG4ZZe4j3VPItFcbL+4k2LVPfPu+OKm3L5yaptUuY4IJJHb1VJ+QqF2y9aswemyw2ltf3swIWad5WOOXM5H0rT8IaKLu6tr64jxJKwnbd+lRzVa5vqt2t3Jb6NauSu9BL8SBj5DNd60CBIrNHPVgAK9FdHA+7LIRhpi3PaOmaTdHIAPhTn/AJU042knbQDExr6FGIlxQ3biBTuxVUmhgiojgjTd6PqnFSYsbOXSmZRtmkHic0mF+dee9OjvW1ZE4m0watol1Z4y8iZjz3OuCp+YH1rzxq0UkmowW7nCvIV29do5ZH3r00TuFck/EPQ4dL11dUKSGG6LbdoGEk/V8+v/AJVbHKtEcivZV25jijCqGY45KoxRyG9YejCqRjntBpVhJbOn/wAjK2f9RcVcxQbk3b1ZfKqk0VdndFgA/ca1nD3K6Zx6jR5+IrJXQC3L7K0XC9wzStF+3/agDUl1HKiZ1xTIFE9aMBPLzoU1t5mhQBq1ZaUJcUKFTRthiTdXOuL7+TUdd/IEjsLc52sobJA5nny78UdCmBUSbLh5GUsvPmvdimbm7/KlGikdHjPohOW4+/uoUKALG34rvolVbgCXI6nrVdrOvvfmS2DrC6IJAGUsGHPGfiOlFQpcV2Pm6ozun2bPrMFyxXtWx2oXoX8RXfNKm/ycXuoUKtHoiTUfdzboKU5BIK99ChTBhiSNORzk9aakftHwOgoUKARCvTiYN7S/b/mmWbHOhQrgy/Y7sX1HYpdwAqk40uLU6atrcpvkdgyLt6YI+45fE0KFOHYT6Oc3FjFLePFbN2bDDAHoc+fUfX4UdjPNZXHZSKCp5OtHQrqZy+By7iClz58qtOFB/nWz/wBM/cUKFIDXMabzQoVoyJNChQoA/9k=" },
        { sender: "User 1", text: "Doing great! Did you finish the project?", image: null },
        { sender: "User 2", text: "Yes, I sent it this morning.", image: null },
        { sender: "User 1", text: "Perfect! Let's plan the next steps.", image: null },
        { sender: "User 2", text: "Sure, I was thinking we could discuss it tomorrow.", image: null },
        { sender: "User 1", text: "Sounds good! Catch you tomorrow.", image: null },
        { sender: "User 2", text: "Alright, see you!", image: null },
        { sender: "User 1", text: "Hi, how are you?", image: null },
        { sender: "User 2", text: "I'm good, thanks! How about you?", image: null },
        { sender: "User 1", text: "Doing great! Did you finish the project?", image: null },
        { sender: "User 2", text: "Yes, I sent it this morning.", image: null },
        { sender: "User 1", text: "Perfect! Let's plan the next steps.", image: null },
        { sender: "User 2", text: "Sure, I was thinking we could discuss it tomorrow.", image: null },
        { sender: "User 1", text: "Sounds good! Catch you tomorrow.", image: null },
        { sender: "User 2", text: "Alright, see you!", image: null },
    ];

    const sendMessage = () => {
        if (input || image) {
            setMessages([...messages, { text: input, image }]);
            setInput("");
            setImage(null);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 px-5 pr-8 gap-4 flex justify-between items-center">
                <div className="gap-4 flex justify-start items-center">
                    <img src={picture} alt="" className="h-12 w-12 rounded-full" />
                    <div className="">
                        <h1 className="text-lg">{name}</h1>
                        <h1 className="text-sm">typing</h1>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5">
                    <IoIosVideocam className="text-3xl shadow rounded-l" />
                    <IoMdSearch className="text-2xl shadow rounded-l" />
                    <CgMenuGridO className="text-2xl shadow rounded-l" />
                </div>
            </div>

            {/* Message List */}
            <div className="flex-1 p-4 overflow-y-scroll">
                {conversation?.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-4 flex ${msg.sender === "User 1" ? "justify-start" : "justify-end"
                            }`}
                    >
                        <div
                            className={`max-w-xs p-3 rounded-lg ${msg.sender === "User 1"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            {/* <p className="font-bold">{msg.sender}</p> */}
                            {msg.image && (
                                <img
                                    src={msg.image}
                                    alt="Uploaded"
                                    className="mb-2 max-h-40 rounded-lg"
                                />
                            )}
                            {msg.text && <p>{msg.text}</p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="flex relative items-center p-4 bg-blue-600 text-black border-t text-lg border-gray-300">
                <IoMdAdd className="text-3xl text-black" />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                />
                <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-blue-600 px-3"
                >
                    <div className="flex justify-center items-center gap-2">
                        <PiImagesSquareLight className="text-3xl text-black" />
                    </div>
                </label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-4 py-2 ml-3 rounded-lg"
                >
                    <IoSend />
                </button>
            </div>
        </div>
    );
};

export default MessagePage;
