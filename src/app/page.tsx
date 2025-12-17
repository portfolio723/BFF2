import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Gift } from "lucide-react";

export default function Home() {
  const heroImage1 = PlaceHolderImages.find(img => img.id === 'hero-1');
  const heroImage2 = PlaceHolderImages.find(img => img.id === 'hero-2');
  const heroImage3 = PlaceHolderImages.find(img => img.id === 'hero-3');

  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-6">
               <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium">
                  <span className="w-2 h-2 mr-2 rounded-full bg-black"></span>
                  Empowering readers, one book at a time
                </div>
              <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
                Discover, Rent & <br />
                <span className="bg-gray-200/50 px-2 rounded-md">Share</span> Books
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Join our community of book lovers. Rent books for just delivery charges, buy at affordable prices, or donate to make knowledge accessible to all.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <Link href="/books">Explore Books <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/donate"><Gift className="mr-2 h-4 w-4" /> Donate Books</Link>
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-3xl font-bold">10K+</p>
                    <p className="text-sm text-muted-foreground">Books Available</p>
                </div>
                 <div>
                    <p className="text-3xl font-bold">5K+</p>
                    <p className="text-sm text-muted-foreground">Happy Readers</p>
                </div>
                 <div>
                    <p className="text-3xl font-bold">2K+</p>
                    <p className="text-sm text-muted-foreground">Books Donated</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
                 <div className="grid grid-cols-2 gap-4">
                    {heroImage1 && (
                         <div className="col-span-1 pt-20">
                            <Image
                                src={heroImage1.imageUrl}
                                alt={heroImage1.description}
                                data-ai-hint={heroImage1.imageHint}
                                width={300}
                                height={450}
                                className="object-cover rounded-lg shadow-lg aspect-[2/3]"
                            />
                        </div>
                    )}
                    <div className="col-span-1 grid gap-4">
                        {heroImage2 && (
                            <Image
                                src={heroImage2.imageUrl}
                                alt={heroImage2.description}
                                data-ai-hint={heroImage2.imageHint}
                                width={300}
                                height={200}
                                className="object-cover rounded-lg shadow-lg aspect-[3/2]"
                            />
                        )}
                        {heroImage3 && (
                            <Image
                                src={heroImage3.imageUrl}
                                alt={heroImage3.description}
                                data-ai-hint={heroImage3.imageHint}
                                width={300}
                                height={200}
                                className="object-cover rounded-lg shadow-lg aspect-[3/2]"
                            />
                        )}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
