"use client"
import Header from "@/components/layouts/PageHeader";
import useMessages from "@/hooks/queries/useMessages";
import { MessageType } from "@/lib/actions/public/fetchMessages";
import { mediaUrl } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";

const Message: React.FC<MessageType> = (data) => (
  <div className="mb-16">
    <h4 className="mb-6 text-2xl">Message from the {data.message_from}</h4>
    <div className="sm:hidden flex gap-6 mb-6">
      <div className="relative w-full h-60">
        <Image
          alt={data.full_name}
          src={mediaUrl(data.avatar)}
          fill
          objectFit="cover"
        />
      </div>
      <div className="">
        <h3 className="text-xl">{data.full_name}</h3>
        <div>
          {data.message_from === "director" ? (
            <>
              <p>Director</p>
              <p>NIT Arunachal Pradesh</p>
            </>
          ) : (
            <>
              <p>President, Alumni Association, NITAP</p>
              <p>{data.designation}</p>
              <p>{data.department}</p>
            </>
          )}
          <p>{data.email}</p>
          <p>{data.phone}</p>
        </div>
      </div>
    </div>
    <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-20 gap-8">
      <div className="col-span-1 whitespace-pre-line text-sm">
        {data.message}
      </div>
      <div className="col-span-1 sm:block hidden">
        <div className="relative w-full h-96">
          <Image
            alt={data.full_name}
            src={mediaUrl(data.avatar)}
            fill
            objectFit="cover"
          />
        </div>
        <div className="my-6">
          <h3>{data.full_name}</h3>
          <div>
            {data.message_from === "director" ? (
              <>
                <p>Director</p>
                <p>NIT Arunachal Pradesh</p>
              </>
            ) : (
              <>
                <p>President, Alumni Association, NITAP</p>
                <p>{data.designation}</p>
                <p>{data.department}</p>
              </>
            )}
            <p>{data.email}</p>
            <p>{data.phone}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const About = () => {
  const messagesQuery = useMessages()
  const presidentsMessage = messagesQuery.data?.messages?.find(msg => msg.message_from === "president")
  const directorsMessage = messagesQuery.data?.messages?.find(msg => msg.message_from === "director")

  return (
    <>
      <Header
        pageHeading="About us"
        subHeading="Welcome College alumni and undergraduates! We hope you will explore the many ways to connect with the NIT Arunachal Pradesh community."
        bgImage="/header-bg/2023-06-07-1.jpg"
      />
      <div className="page-main container">
        {messagesQuery.isLoading ? <LoaderCircle className="animate-spin" /> : (
          <>
            {directorsMessage && <Message {...directorsMessage} />}
            {presidentsMessage && <Message {...presidentsMessage} />}
          </>
        )}
        {/* TODO: 
          - Coordinator details
        */}
      </div >
    </>
  );
};

export default About;
